import {DeepPartial, EntityRepository, Repository} from "typeorm";
import {Profile} from "../entity/account/Profile";


@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
    createDefaultProfile(entityLike: DeepPartial<Profile>) {
        super.create(entityLike);
    }
}
