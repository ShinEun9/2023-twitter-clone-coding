const express = require("express");
const app = express();
const db = require("./models");
const postRouter = require("./routes/post");

db.sequelize
  .sync()
  .then(() => {
    console.log("db연결성공!");
  })
  .catch(console.error);

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/api", (req, res) => {
  res.send("hi express");
});

app.get("/api/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hello" },
    { id: 3, content: "hello" },
  ]);
});

app.use("/post", postRouter);

app.listen(3065, () => {
  console.log("서버실행중");
});
