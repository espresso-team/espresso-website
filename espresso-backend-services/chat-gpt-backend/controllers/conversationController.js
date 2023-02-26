const conversationService = require("../services/conversationService");
  
exports.createConv = async (req, res) => {
  try {
    const conv = await conversationService.createBlog(req.body);
    res.json({ data: conv, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.getConvById = async (req, res) => {
  try {
    const conv = await conversationService.getBlogById(req.params.id);
    res.json({ data: conv, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.updateConv = async (req, res) => {
  try {
    const conv = await conversationService.updateConv(req.params.id, req.body);
    res.json({ data: conv, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deleteBlog = async (req, res) => {
  try {
    const conv = await conversationService.deleteConv(req.params.id);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};