// const bodyParser = require("body-parser");
// const express = require("express");
import express from "express";
import bodyParser from "body-parser";
import { init_client, init_conv, send_message } from "./chatgpt-client.js";
import { createConversation, getConv, updateConv, deleteConv } from "./services/conversationService.js";
import { connect } from "./mongo.js";
import { model, mongoose } from "mongoose";
import { ObjectId } from 'mongodb';
import cors from "cors";

const app = express();
app.use(cors({
    origin: '*'
}));
const port = 3000;

// connect mongo client
connect();

// Init chatgpt client
init_client();

// Body parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Route to handle incoming messages
app.post("/send-message", async (req, res) => {
  const message = req.body.message;
  const user_id = req.body.user_id;
  const model_id = req.body.model_id;
  const condition = { 'user_id': user_id, 'model_id': model_id };
  var conv = await getConv(condition);
  
  try {
    console.log(`conv is ${conv.conv_id}, msg is ${conv.last_msg_id}`);
    const response = await send_message(message, conv.conv_id, conv.last_msg_id);
    console.log(response);
    conv.conv_id = response.conversationId;
    conv.last_msg_id = response.messageId;
    await updateConv(condition, conv);
    res.json({ message: response.response, status: "success",
               user_id: user_id, mode_id: model_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route when a new user join chat
app.post("/join-chat", async (req, res) => {
  const user_id = req.body.user_id;
  const model_id = req.body.model_id;
  // init a new converstation for a new user
  var response = await init_conv(model_id);
  console.log(response);
  var conv = {
    user_id: user_id,
    model_id: model_id,
    conv_id: response.conversationId,
    last_msg_id: response.messageId
  };
  
  try {
    await createConversation(conv);
    res.json({ message: response.response, status: "success",
              user_id: user_id, model_id: model_id});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});