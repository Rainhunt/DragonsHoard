export interface NestedSchemaRecord {
    [key: string]: string | number | NestedSchemaRecord | NestedSchemaRecord[] | undefined
}

export type PagePerms = "all" | "notLogged" | "user" | "whitelist" | "admin";
