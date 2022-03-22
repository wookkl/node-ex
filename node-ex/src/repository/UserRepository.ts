import {EntityRepository, Repository} from "typeorm";
import { User } from "../entity/account/User"


@EntityRepository(User)
export class UserRepository extends Repository<User> {

}