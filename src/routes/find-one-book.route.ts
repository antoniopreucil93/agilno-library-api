import { Request, Response } from 'express';
import { DataSource } from 'typeorm';

import { BookEntity } from '../database/entities/book.entity';

export async function findOneBook(
    req: Request,
    res: Response,
    databaseSource: DataSource
): Promise<Response> {
    const bookId = +req.params['bookId'];

    try {
        const book = await databaseSource
            .getRepository(BookEntity)
            .findOne({ where: { id: bookId } });

        if (!book) {
            return res.status(404).send({
                message: 'Book not found',
            });
        }

        return res.json(book).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
