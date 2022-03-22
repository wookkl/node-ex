import {NextFunction, Request, Response} from "express";
import {User} from "../entity/account/User";
import {UserRepository} from "../repository/UserRepository";
import {DeepPartial, getConnection, getCustomRepository} from "typeorm";

export class UserController {
    constructor() {
    }

    private userRepository = getCustomRepository(UserRepository);

    async getById(request: Request, response: Response, next: NextFunction): Promise<User> {
        return await this.userRepository.findOne(request.params.id);
    }

    async create(request: Request, response: Response, next: NextFunction): Promise<User> {
        const validatedData = UserController.validateUserCreateData(request.body);
        const user = this.userRepository.create(validatedData);
        await this.userRepository.save(user);
        return user
    }

    private static validateUserCreateData(data: Record<string, unknown>): DeepPartial<User> {
        return {
            username: data.username as string,
            password: data.password as string,
        };
    }
}