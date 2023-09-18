import { useRouter } from "next/router";

const aboutDetail = () => {
  const router = useRouter();
  const { name } = router.query;
  console.log(name);

  return <p>name: {name}</p>;
};

export default aboutDetail;
