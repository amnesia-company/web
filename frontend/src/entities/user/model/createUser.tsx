import type {UserType} from "../lib/types";

/**
 * Creates a normalised user object from the provided data.
 *
 * @param user - User data conforming to UserType.
 * @returns A normalised user object ready for use in the Redux store.
 */
export function createUser({
    id,
    name,
    rating,
    avatarUrl,
    backgroundUrl,
    status,
    borderAvatarType,
    createdAt
}: UserType) {
    return {
        id,
        name,
        rating,
        avatarUrl,
        backgroundUrl,
        status,
        borderAvatarType,
        createdAt
    };
}
