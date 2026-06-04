import {Layout} from "widgets/layout";
import {useSelector} from "react-redux";
import {selectUserInfo} from "entities/user";
import {Hero} from "widgets/hero";
import {Advantages} from "widgets/advantages";
import {HomeNav} from "widgets/homeNav";

/**
 * Home page (index).
 *
 * Composes Hero into the layout's heroContent slot and renders
 * Advantages followed by HomeNav as the main page content.
 */
export const Home = () => {
    const principalUserInfo = useSelector(selectUserInfo);

	return (
		<Layout heroContent={<Hero />} principalUserInfo={principalUserInfo}>
            <Advantages />
            <HomeNav />
        </Layout>
	)
}
