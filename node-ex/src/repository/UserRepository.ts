import {DeepPartial, EntityRepository, Repository} from "typeorm";
import { User } from "../entity/account/User"
import {TokenMiddleware } from "../middleware";

export interface UserPaginationResponse {
    data: User[];
    totalPage: number;
}

export interface UserCreatedResponse {
    user: User;
    token: string;
}

export interface TokenResponse {
    token: string;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async findByTerm(term?: string, page?: number): Promise<UserPaginationResponse> {
        let queryBuilder = this.createQueryBuilder("user")
            .innerJoin("user.profile", "profile")
            .take(10);
        if (term) {
            queryBuilder = queryBuilder.where(
                "user.username ILIKE :term OR profile.email ILIKE :term OR profile.nickname ILIKE :term",
                {term: `%${term}%`}
            );
        }
        if (page) {
            queryBuilder = queryBuilder.skip(10 * Number(page - 1));
        }
        const [data, count] = await queryBuilder.getManyAndCount();
        return {data, totalPage: Math.ceil(count / 10)};
    }
    createWithToken(entityLike?: DeepPartial<User>): UserCreatedResponse {
        const user = super.create(entityLike);
        const token = (new TokenMiddleware()).encode(user);
        return { token, user };
    }

    async login(credentials: {username: string, password: string}): Promise<TokenResponse> {
        const user = await this.findOne({username: credentials.username});
        if (user === undefined) {
            throw new Error('User does not exists.');
        }
        if (user.password !== credentials.password) {
            throw new Error('Password not matched.');
        }
        return {token: (new TokenMiddleware()).encode(user)};
    }
}
