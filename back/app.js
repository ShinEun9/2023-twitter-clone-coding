const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db연결성공!");
  })
  .catch(console.error);
passportConfig();

// * 아래 두줄이 있어야 req.body를 사용할 수 있다.
// use는 express로 만든 app이라는 서버에 무언가를 장착한다는 의미
// express.json()과 express.urlencoded({extended: true})가 프론트에서 보낸 데이터를 req.body에 넣어주는 역할을 한다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: false,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.get("/", (req, res) => {
//   res.send("hello express");
// });

// app.get("/api", (req, res) => {
//   res.send("hi express");
// });

// app.get("/api/posts", (req, res) => {
//   res.json([
//     { id: 1, content: "hello" },
//     { id: 2, content: "hello" },
//     { id: 3, content: "hello" },
//   ]);
// });

app.use("/post", postRouter);
app.use("/user", userRouter);

// app.use((err, req, res, next) => {});

app.listen(3065, () => {
  console.log("서버실행중");
});
