interface ServicesConfig {
    apiUrl: string;
    jwtKey: string;
}

export const servicesConfig: ServicesConfig = {
    apiUrl: "http://localhost:8181/",
    jwtKey: "user"
}