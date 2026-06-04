import { Layout } from 'widgets/layout';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'entities/user';

/** Rules page component. */
export const Rules = () => {
  const principalUserInfo = useSelector(selectUserInfo);

  return <Layout principalUserInfo={principalUserInfo}></Layout>;
};
