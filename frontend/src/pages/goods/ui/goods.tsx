import { Layout } from 'widgets/layout';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'entities/user';

/** Goods page component. */
export const Goods = () => {
  const principalUserInfo = useSelector(selectUserInfo);

  return <Layout principalUserInfo={principalUserInfo}></Layout>;
};
