const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { Post, User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err); // 에러처리 미들웨어로, 에러처리 미들웨어는 app.js에 내부적으로 존재함. 에러처러 미들웨어는 에러를 자동으로 프론트로 넘겨줌. 에러처리 미들웨어를 다르게 바꿔줄수있음
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      // res.setHeader('Cookie', 'chxy...') => 내부적으로 한다.
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post, // hasMany라서 model: Post가 복수형이되어 me.Posts가 된다.
          },
          {
            model: User,
            as: "Followings",
          },
          {
            model: User,
            as: "Followers",
          },
        ],
      });
      return res.json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/", isNotLoggedIn, async (req, res, next) => {
  // POST /user
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) return res.status(403).send("이미 사용중인 아이디입니다.");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok"); // 201은 잘 생성되었다. 라는 뜻
  } catch (err) {
    console.log(err);
    next(err); // staus 500 브라우저로 err 보내기
  }
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
