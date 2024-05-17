export type Article = {
    id: number;
    userId: number;
    title: string;
    body: string;
    time: string;
}

export type JWTPlyload = {
    id: number;
    isAdmin: boolean;
    username: string;
}