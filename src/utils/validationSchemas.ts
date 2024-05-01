import { z
    
 } from "zod";

 //article Schema

export const articlesSchema = z.object({
    title: z.string().min(2).max(200),
    description: z.string().min(5).max(500),
});

export const registerSchema = z.object({
    username: z.string().min(2).max(100),
    email: z.string().min(3).max(500).email(),
    password:z.string().min(6)
});