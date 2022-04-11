import {DeepPartial, EntityRepository, Repository} from "typeorm";
import {Profile} from "../entity/account/Profile";


@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
    createDefaultProfile(entityLike: DeepPartial<Profile>): Profile{
        return super.create(entityLike);
    }
}
