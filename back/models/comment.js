module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // * belongsTo의 역할 (실제 컬럼이 생긴다)
      // UserId: 1 => 1번 유저가 댓글을 달았다.
      // PostID: 3 => 3번 게시글에 댓글을 달았다.
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 이모티콘 저장
    }
  );

  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
