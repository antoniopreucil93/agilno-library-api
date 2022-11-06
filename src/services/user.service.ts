import { User } from '../models';
import { hashSync } from 'bcrypt';

export class UserService {
    public createUser(username: string, password: string): User {
        const newUser = new User();
        newUser.username = username;
        newUser.password = hashSync(password, 10);
        return newUser;
    }
}
