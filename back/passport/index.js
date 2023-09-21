const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); // 세션에 다 들고 있기 무거우니깐 userId만 저장
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } }); // 세션에 저장한 id를 통해 user 정보 복구
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
