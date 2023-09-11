import React from "react";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const mainPosts = useSelector((state) => state.post.mainPosts);
  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
