import { Layout } from 'widgets/layout';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'entities/user';

/** Media page component. */
export const Media = () => {
  const principalUserInfo = useSelector(selectUserInfo);

  return <Layout principalUserInfo={principalUserInfo}></Layout>;
};
