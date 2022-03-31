import * as jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";
import {User} from "./entity/account/User";


export interface TokenPayload {
    userId: number;
}

export interface CustomRequest extends Request{
    user?: User;
    headers: {[props: string]: any}
}

export class InvalidTokenException extends Error {
    constructor() {
        super("Invalid token provided.");
    }
}

export class TokenMiddleware {
    constructor(private request?: CustomRequest) {
    }

    private secret = process.env.WEB_TOKEN_SECRET;

    encode(user: User): string {
        return jwt.sign({ userId: user.id }, this.secret);
    }

    async decode(): Promise<void> {
        try {
            const token =  this.request.headers["x-token"];
            const payload: TokenPayload = jwt.verify(token, this.secret);
            this.request.user = await User.findOne({id: payload.userId});
        } catch (error) {
            throw new InvalidTokenException();
        }
    }
}

export const tokenMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authorizedPath = ['/user', '/user/login'];
        if (!authorizedPath.includes(request.path)) {
            const tokenMiddlewareInstance = new TokenMiddleware(request);
            await tokenMiddlewareInstance.decode();
        }
        next();
    }
    catch (error) {
        return response.status(403).json({message: "Token must be provided.", error});
    }
}

export const corsOptionDelegate = (request, callback) => {
    const corsOptions = {
        origin: "*",
        allowedHeaders: "X-Token"
    };
    callback(null, corsOptions);
};
