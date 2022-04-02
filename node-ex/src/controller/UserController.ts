import {NextFunction, Request, Response} from "express";
import {User} from "../entity/account/User";
import {TokenResponse, UserCreatedResponse, UserPaginationResponse, UserRepository} from "../repository/UserRepository";
import {DeepPartial, getCustomRepository} from "typeorm";
import {userEmitter} from "../emitter/UserEmitter";

export class UserController {
    constructor() {
    }

    private userRepository = getCustomRepository(UserRepository);
    private userEmitter = userEmitter;

    async getById(request: Request, response: Response, next: NextFunction): Promise<User> {
        return await this.userRepository.findOne(request.params.id);
    }

    async getByTerm(request: Request, response: Response, next: NextFunction): Promise<UserPaginationResponse> {
        const term = request.query.term as string;
        const page = Number(request.query.page);
        return await this.userRepository.findByTerm(term, page);
    }

    async create(request: Request, response: Response, next: NextFunction): Promise<UserCreatedResponse> {
        const validatedData = UserController.validateUserCreateData(request.body);
        const {token, user} = this.userRepository.createWithToken(validatedData);
        await this.userRepository.save(user);
        this.userEmitter.emit('createUser');
        return {token, user};
    }

    async login(request: Request, response: Response, next: NextFunction): Promise<TokenResponse> {
        return this.userRepository.login(request.body);
    }

    private static validateUserCreateData(data: Record<string, unknown>): DeepPartial<User> {
        return {
            username: data.username as string,
            password: data.password as string,
        };
    }
}