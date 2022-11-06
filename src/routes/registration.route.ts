import { Request, Response } from 'express';
import { DataSource } from 'typeorm';

import { registeralidator } from '../validators';
import { UserEntity } from '../database/entities/user.entity';
import { User } from '../models';
import { UserService } from '../services/user.service';

const userService = new UserService();

export async function register(
    req: Request,
    res: Response,
    databaseSource: DataSource
): Promise<Response> {
    const { error, value } = registeralidator.validate({
        username: req.body.username,
        password: req.body.password,
    });

    if (error) {
        return res.status(400).send(error.message);
    }

    try {
        const newUserForStore: User = userService.createUser(value.username, value.password);

        const newUser: UserEntity = await databaseSource
            .getRepository(UserEntity)
            .save(newUserForStore);

        return res.json({ username: newUser }).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
