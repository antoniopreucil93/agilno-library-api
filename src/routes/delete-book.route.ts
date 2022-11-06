import { Request, Response } from 'express';
import { DataSource } from 'typeorm';

import { BookEntity } from '../database/entities/book.entity';

export async function deleteBook(
    req: Request,
    res: Response,
    databaseSource: DataSource
): Promise<Response> {
    const bookId: number = +req.params['bookId'];

    const book: BookEntity = await databaseSource
        .getRepository(BookEntity)
        .findOne({ where: { id: bookId } });

    if (!book) {
        return res.status(404).send({
            message: 'Book not found',
        });
    }

    try {
        await databaseSource.getRepository(BookEntity).remove(book);

        return res
            .json({
                message: 'Book deleted',
            })
            .status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
