import {EventEmitter} from 'events';
import {User} from "../entity/account/User";

export const userEmitter = new EventEmitter();

function createDefaultProfile(user: User) {
    console.log("Event emitter executed successfully")
    console.log("Create default profile");
}

userEmitter.on('createUser', createDefaultProfile);