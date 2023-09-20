const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // POST /post
  res.json({ id: 1, content: "hello" });
});

router.delete("/", (req, res) => {
  // DELETE /post
  res.json({ id: 1, content: "hello" });
});

module.exports = router;
