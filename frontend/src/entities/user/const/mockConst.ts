import {createUser} from "../model/createUser";

/**
 * Mock authenticated user fixture.
 * Used by InitProvider for initial data loading and in tests as a user fixture.
 */
export const principalUserMock = createUser({
    id: 1,
    name: "testUser",
    rating: 10,
    avatarUrl: "",
    backgroundUrl: "",
    status: "online",
    borderAvatarType: "default",
    createdAt: "2026-04-22T10:00:00.000Z",
});
