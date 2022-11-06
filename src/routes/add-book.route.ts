import { Request, Response } from 'express';
import { BookEntity } from '../database/entities/book.entity';
import { DataSource } from 'typeorm';
import { BookService } from '../services';
import { bookCreateValidator } from '../validators';
import { Book } from '../models';

const bookService = new BookService();

export async function addBook(
    req: Request,
    res: Response,
    databaseSource: DataSource
): Promise<Response> {
    const { error, value } = bookCreateValidator.validate({
        title: req.body.title,
        description: req.body.description,
    });

    if (error) {
        return res.status(400).send(error.message);
    }

    try {
        const newBookForStore: Book = bookService.createBook(value.title, value.description);

        const storedBook: BookEntity = await databaseSource
            .getRepository(BookEntity)
            .save(newBookForStore);

        return res.json(storedBook).status(200);
    } catch (err) {
        return res.status(500).send(err);
    }
}
