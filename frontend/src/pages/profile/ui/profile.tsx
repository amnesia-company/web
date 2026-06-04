import { Layout } from 'widgets/layout';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'entities/user';

/** Profile page component. */
export const Profile = () => {
  const principalUserInfo = useSelector(selectUserInfo);

  return <Layout principalUserInfo={principalUserInfo}></Layout>;
};
