import { createHash } from "crypto";
import jwt from "jsonwebtoken";
import { User, fetchUser } from "../schema/user.schema";
import { configDotenv } from "dotenv";
configDotenv();

export function generateHash(password: string): string {
    const salt = process.env.PASSWORD_SALT || "str8bat";
    const hash = createHash("sha256").update(salt + password).digest("hex");
    return salt + hash;
}

export function createJWT(user: User, time: number): string {
    
    const secretKey = process.env.PASSWORD_SALT || "str8bat";
    const payload = {
        email: user.email,
        iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(payload, secretKey, {
        expiresIn: time,
        issuer: 'str8bat',
        algorithm: 'HS256',
    });
    return token;
}

export async function verifyJWT(token: string): Promise<User> {
    // Your secret key (should be stored securely in an environment variable)
    const secretKey = process.env.PASSWORD_SALT || "str8bat";

    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    if (!decoded) throw new Error("Invalid token");
    const payload = decoded as { email: string, iat: number, exp: number, iss: string };
    const user = await fetchUser(payload.email);
    if (user.is_active === false) throw new Error("User is not active");
    if (payload.exp < Math.floor(Date.now() / 1000)) throw new Error("Token expired");
    return user;
}