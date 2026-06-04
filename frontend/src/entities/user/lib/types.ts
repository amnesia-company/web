/**
 * Represents the profile of an application user.
 *
 * @property id               - Unique identifier of the user.
 * @property name             - Display name shown across the application.
 * @property rating           - Numerical user rating.
 * @property backgroundUrl    - URL of the profile background image.
 * @property status           - Presence status (e.g. "online", "offline").
 * @property borderAvatarType - Avatar border style identifier.
 * @property createdAt        - Account creation date in ISO 8601 format.
 */
export interface UserType {
    id: number;
    name: string;
    rating: number;
    avatarUrl: string;
    backgroundUrl: string;
    status: string;
    borderAvatarType: string;
    createdAt: string;
}
