import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/account/User";

export class UserController {

    private userRepository = getRepository(User);


}