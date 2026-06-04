import {Layout} from "widgets/layout";
import {useSelector} from "react-redux";
import {selectUserInfo} from "entities/user";

/** Beginners page component. */
export const Beginners = () => {
    const principalUserInfo = useSelector(selectUserInfo);

    return (
        <Layout principalUserInfo={principalUserInfo}>

        </Layout>
    )
}
