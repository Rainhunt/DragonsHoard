export interface NestedSchemaRecord {
    [key: string]: string | number | NestedSchemaRecord | string[] | number[] | NestedSchemaRecord[] | undefined
}

export type PagePerms = "all" | "notLogged" | "user" | "whitelist" | "admin";
