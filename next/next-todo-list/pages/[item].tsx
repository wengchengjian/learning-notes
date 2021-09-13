import { useRouter } from 'next/router';

const Item = () => {
  const router = useRouter();
  const { item } = router.query;

  return <>item</>;
};

export default Item;
