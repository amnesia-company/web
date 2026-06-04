import {Layout} from "widgets/layout";
import {useSelector} from "react-redux";
import {selectUserInfo} from "entities/user";
import {NotFoundWidget} from "widgets/notFoundWidget";

/**
 * 404 page.
 *
 * Renders Layout without a header and mounts NotFoundWidget inside it.
 */
export const NotFound = () => {
    const principalUserInfo = useSelector(selectUserInfo);

	return (
		<Layout isShowHeader={false} principalUserInfo={principalUserInfo}>
            <NotFoundWidget />
		</Layout>
	)
}
