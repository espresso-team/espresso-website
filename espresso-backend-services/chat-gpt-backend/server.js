const express = require("express");
const bodyParser = require("body-parser");
const { init_client, init_conv, send_message } = require("./chatgpt-client");
const conversationService = require("../services/conversationService");
const { connect } = require("./mongo");

const app = express();
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
  const uuid_for_conv = user_id + "," + model_id
  const conv = conversationService.getConvById(uuid_for_conv);
  
  try {
    await send_message(message, conv.conversationId, conv.messageId);
    res.json({ message: "Message sent!", status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route when a new user join chat
app.post("/join-chat", async (req, res) => {
  const user_id = req.body.user_id;
  const model_id = req.body.model_id;
  // init a new converstation for a new user
  const uuid_for_conv = user_id + "," + model_id
  const response = init_conv(model_id);

  const conv ={
    id: uuid_for_conv,
    user_id: user_id,
    conv_id: response.conv_id,
    last_msg_id: response.messageId,
  }
  
  try {
    await conversationService.createConversation(conv);
    res.json({ message: "Initialization complete!", status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});