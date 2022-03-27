import {EntityRepository, Repository} from "typeorm";
import { User } from "../entity/account/User"

export interface UserPaginationResponse {
    data: User[];
    totalPage: number;
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
        return { data, totalPage: Math.ceil(count / 10)};
    }

}