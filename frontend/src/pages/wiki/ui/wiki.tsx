import { Layout } from 'widgets/layout';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'entities/user';

/** Wiki page component. */
export const Wiki = () => {
  const principalUserInfo = useSelector(selectUserInfo);

  return <Layout principalUserInfo={principalUserInfo}></Layout>;
};
