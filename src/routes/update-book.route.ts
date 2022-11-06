import { Request, Response } from 'express';
import { DataSource } from 'typeorm';

import { BookEntity } from '../database/entities/book.entity';
import { bookUpdateValidator } from '../validators';
import { Book } from '../models';

export async function updateBook(
    req: Request,
    res: Response,
    databaseSource: DataSource
): Promise<Response> {
    const { error, value } = bookUpdateValidator.validate({
        title: req.body.title,
        description: req.body.description,
    });

    if (error) {
        return res.status(400).send(error);
    }

    const bookId = +req.params['bookId'];

    const book = await databaseSource.getRepository(BookEntity).findOne({ where: { id: bookId } });

    if (!book) {
        return res.status(400).send({
            message: 'Book not found',
        });
    }

    try {
        const storedBook: BookEntity = await databaseSource.getRepository(BookEntity).save({
            ...book,
            title: value.title ? value.title : book.title,
            description: value.description ? value.description : book.description,
        });

        return res.json(storedBook).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
