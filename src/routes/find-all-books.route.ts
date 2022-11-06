import { Request, Response } from 'express';
import { BookEntity } from '../database/entities/book.entity';
import { DataSource } from 'typeorm';

export async function findAllBooks(
    _: Request,
    res: Response,
    databaseSource: DataSource
): Promise<Response> {
    try {
        const book = await databaseSource.getRepository(BookEntity).find();

        return res.json(book).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
