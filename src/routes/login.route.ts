import { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';

import { loginValidator } from '../validators';
import { UserEntity } from '../database/entities/user.entity';
import { User } from '../models';

export async function login(
    req: Request,
    res: Response,
    databaseSource: DataSource
): Promise<Response> {
    const { error, value } = loginValidator.validate({
        username: req.body.username,
        password: req.body.password,
    });

    if (error) {
        return res.status(400).send(error.message);
    }

    try {
        const user: UserEntity = await databaseSource.getRepository(UserEntity).findOne({
            where: {
                username: value.username,
            },
        });

        if (!user) {
            return res.status(404).send('User not found.');
        }

        if (!(await compare(value.password, user.password))) {
            return res.status(404).send('Incorrect credentials.');
        }

        const userJwtToken: string = jwt.sign(
            { userId: user.id, userRole: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: 8640,
            }
        );

        return res.json({ token: userJwtToken }).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
