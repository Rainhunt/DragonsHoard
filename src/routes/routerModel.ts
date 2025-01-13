export enum ROUTES {
    ROOT = "/",
    ABOUT = "/about",
    CODEX = "/codex",
    MY_MONSTERS = "/codex/homebrew",
    MONSTER_STATBLOCK = "/monsters/statblock",
    CREATE_MONSTER = "/monsters/create",
    SIGNUP = "/signup",
    LOGIN = "/login",
    PROFILE = "/profile",
    EDIT_USER = "/profile/update",
    MANAGE_USERS = "/admin/users"
}

export type RoutePaths = ROUTES;