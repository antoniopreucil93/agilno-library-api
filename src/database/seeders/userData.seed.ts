import { hashSync } from 'bcrypt';
import { UserRole } from '../../enum';

const usersData: { username: string; password: string; role: string; rawPassword: string }[] = [
    {
        username: 'admin@mail.com',
        password: hashSync('123456', 10),
        rawPassword: '123456',
        role: UserRole.ADMIN,
    },
    {
        username: 'john@mail.com',
        password: hashSync('123456', 10),
        rawPassword: '123456',
        role: UserRole.USER,
    },
];

export default usersData;
