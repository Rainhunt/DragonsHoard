import { servicesConfig } from "../config/servicesConfig";

export class Request {
    private url = servicesConfig.apiUrl;
    private _endpoint: string;
    private _Headers?: Record<string, string>;
    private _Body?: Record<string, string>;

    constructor(endpoint: string) {
        this._endpoint = endpoint;
    }

    set endpoint(value: string) {
        this._endpoint = value;
    }

    set Headers(value: Record<string, string>) {
        this._Headers = value;
    }

    set Body(value: Record<string, string>) {
        this._Body = value;
    }

    private async fetch(method: string): Promise<object | string> {
        const response = await fetch(`${this.url}${this._endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...this._Headers
            },
            body: JSON.stringify(this._Body)
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(message);
        }

        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (err) {
            return text;
        }
    }

    async get(): Promise<object | string> {
        return await this.fetch("GET");
    }

    async post(): Promise<object | string> {
        return await this.fetch("POST");
    }

    async put(): Promise<object | string> {
        return await this.fetch("PUT");
    }

    async pacth(): Promise<object | string> {
        return await this.fetch("PATCH");
    }

    async delete(): Promise<object | string> {
        return await this.fetch("DELETE");
    }
}