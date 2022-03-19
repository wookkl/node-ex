import {NextFunction, Request, Response} from "express";
import {User} from "../entity/account/User";
import {UserRepository} from "../repository/UserRepository";
import {DeepPartial} from "typeorm";

export class UserController {
    constructor() {
    }

    private userRepository = new UserRepository();

    async getById(request: Request, response: Response, next: NextFunction): Promise<User> {
        const id = request.params.structureId;
        return await this.userRepository.findOne(id);
    }

    create(request: Request, response: Response, next: NextFunction): User {
        const validatedData = UserController.validateUserCreateData(request.body);
        return this.userRepository.create(validatedData);
    }

    private static validateUserCreateData(data: Record<string, unknown>): DeepPartial<User> {
        return {
            username: data.username as string,
            password: data.password as string,
        };
    }
}