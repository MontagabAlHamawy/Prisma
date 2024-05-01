export interface CreateArticleDTO {
    title: string;
    description: string;
}

export interface UpdateArticlData{
    title?: string;
    description?: string;
}

export interface RegisterUserDto{
    username:string;
    email:string;
    password:string;
}