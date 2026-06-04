import {Layout} from "widgets/layout";
import {useSelector} from "react-redux";
import {selectUserInfo} from "entities/user";

/** About page component. */
export const About = () => {
    const principalUserInfo = useSelector(selectUserInfo);

    return (
        <Layout principalUserInfo={principalUserInfo}>

        </Layout>
    )
}
