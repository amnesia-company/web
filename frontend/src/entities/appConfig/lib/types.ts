/** Application-level state unrelated to the current user. */
export interface AppConfigType {
    /** Current number of players online on the server. */
    onlineCount: number;
    /** Active UI language code (e.g. "ru", "en"). Empty string means the
     *  language has not yet been resolved in the current session. */
    language: string;
}
