import jwt from "jsonwebtoken";
import { JWTPlyload } from "./types";



export function generateJWT(jwtPlyload: JWTPlyload): string {
    const PrivatKey = process.env.JWT_SECRET;
    const token = jwt.sign(jwtPlyload, PrivatKey as string, {
        expiresIn: '30d'
    });
    return token;
}