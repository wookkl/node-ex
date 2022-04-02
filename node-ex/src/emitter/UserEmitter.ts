import {EventEmitter} from 'events';
import {User} from "../entity/account/User";
import {getCustomRepository} from "typeorm";
import {ProfileRepository} from "../repository/ProfileRepository";

export const userEmitter = new EventEmitter();

async function createDefaultProfile(user: User) {
    const profileRepository = getCustomRepository(ProfileRepository);
    const profile = profileRepository.create({
        user: user,
        nickname: `user_${user.id}`,
        age: 0,
        introduction: "Hi!",
        email: `user_${user.id}@test.com`
    })
    await profileRepository.save(profile);
}

userEmitter.on('createUser', createDefaultProfile);