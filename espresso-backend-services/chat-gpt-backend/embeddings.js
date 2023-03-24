import { post } from 'axios';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { join } from 'path';

import dotenv from 'dotenv';

dotenv.config();

function openFile(filepath) {
  return readFileSync(filepath, 'utf-8');
}

function saveFile(filepath, content) {
  writeFileSync(filepath, content, 'utf-8');
}

function loadJson(filepath) {
  return JSON.parse(readFileSync(filepath, 'utf-8'));
}

function saveJson(filepath, payload) {
  writeFileSync(filepath, JSON.stringify(payload, null, 2), 'utf-8');
}

function timestampToDatetime(unixTime) {
  return moment(unixTime).format('dddd, MMMM Do, YYYY [at] hh:mmA Z');
}

async function gpt3Embedding(content, engine = 'text-embedding-ada-002') {
  content = content.replace(/[^\x00-\x7F]/g, '');

  const url = `https://api.openai.com/v1/engines/${engine}/completions`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  };

  const data = {
    prompt: content,
    max_tokens: 1,
  };

  try {
    const response = await post(url, data, { headers });
    const vector = response.data.choices[0].text;
    return vector;
  } catch (error) {
    console.error(`Error fetching embeddings: ${error}`);
    return null;
  }
}

function similarity(v1, v2) {
  const norm = (a) => Math.sqrt(a.map((x) => x * x).reduce((a, b) => a + b));
  const dot = (a, b) => a.map((x, i) => x * b[i]).reduce((a, b) => a + b);
  return dot(v1, v2) / (norm(v1) * norm(v2));
}

function fetchMemories(vector, logs, count) {
  const scores = logs
    .filter((i) => vector !== i.vector)
    .map((i) => ({ ...i, score: similarity(i.vector, vector) }));
  const ordered = scores.sort((a, b) => b.score - a.score);
  return ordered.slice(0, count);
}

function loadConvo() {
  const files = readdirSync('nexus');
  const jsonFiles = files.filter((file) => file.endsWith('.json'));
  const result = jsonFiles.map((file) => loadJson(join('nexus', file)));
  const ordered = result.sort((a, b) => a.time - b.time);
  return ordered;
}

async function summarizeMemories(memories) {
  memories.sort((a, b) => a.time - b.time);
  const block = memories.map((mem) => mem.message).join('\n\n');
  const prompt = openFile('prompt_notes.txt').replace('<<INPUT>>', block);
  const notes = await gpt3Completion(prompt);
  const vector = await gpt3Embedding(block);
  const info = {
    notes,
    uuids: memories.map((mem) => mem.uuid),
    times: memories.map((    mem) => mem.time),
    uuid: uuidv4(),
    vector,
    time: Date.now(),
  };
  const filename = `notes_${Date.now()}.json`;
  saveJson(path.join('internal_notes', filename), info);
  return notes;
}

function getLastMessages(conversation, limit) {
  const short = conversation.slice(-limit);
  const output = short.map((i) => i.message).join('\n\n');
  return output;
}

async function gpt3Completion(prompt, engine = 'text-davinci-003') {
  prompt = prompt.replace(/[^\x00-\x7F]/g, '');

  const url = `https://api.openai.com/v1/engines/${engine}/completions`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  };

  const data = {
    prompt,
    temperature: 0,
    max_tokens: 400,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ['USER:', 'RAVEN:'],
  };

  try {
    const response = await axios.post(url, data, { headers });
    const text = response.data.choices[0].text.trim().replace(/\s+/g, ' ');
    const filename = `${Date.now()}_gpt3.txt`;
    saveFile(path.join('gpt3_logs', filename), `${prompt}\n\n==========\n\n${text}`);
    return text;
  } catch (error) {
    console.error(`Error fetching completions: ${error}`);
    return `GPT3 error: ${error}`;
  }
}

export async function  () => {
  const openaiApiKey = process.env.OPENAI_API_KEY;
  while (true) {
    const a = await new Promise((resolve) => {
      process.stdout.write('\n\nUSER: ');
      process.stdin.once('data', (data) => resolve(data.toString().trim()));
    });

    const timestamp = Date.now();
    const vector = await gpt3Embedding(a);
    const timestring = timestampToDatetime(timestamp);
    const message = `USER: ${timestring} - ${a}`;
    const info = {
      speaker: 'USER',
      time: timestamp,
      vector,
      message,
      uuid: uuidv4(),
      timestring,
    };
    const filename = `log_${timestamp}_USER.json`;
    saveJson(path.join('nexus', filename), info);

    const conversation = loadConvo();
    const memories = fetchMemories(vector, conversation, 10);
    const notes = await summarizeMemories(memories);
    const recent = getLastMessages(conversation, 4);
    const prompt = openFile('prompt_response.txt').replace('<<NOTES>>', notes).replace('<<CONVERSATION>>', recent);

    const output = await gpt3Completion(prompt);
    const outputTimestamp = Date.now();
    const outputVector = await gpt3Embedding(output);
    const outputTimestring = timestampToDatetime(outputTimestamp);
    const outputMessage = `RAVEN: ${outputTimestring} - ${output}`;
    const outputInfo = {
      speaker: 'RAVEN',
      time: outputTimestamp,
      vector: outputVector,
      message: outputMessage,
      uuid: uuidv4(),
      timestring: outputTimestring,
    };
    const outputFilename = `log_${Date.now()}_RAVEN.json`;
    saveJson(path.join('nexus', outputFilename), outputInfo);

    console.log(`\n\n

