const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.end("hello node");
});
server.listen(3065, () => {
  console.log("서버실행중");
});
