import { Request, Response } from 'express';
import { BookEntity } from '../database/entities/book.entity';
import { DataSource } from 'typeorm';
import { BookService } from '../services';
import { bookCreateValidator, borrowBookValidator } from '../validators';
import { Book } from '../models';
import { BookBorrowinService } from '../services/book-borrowing.service';
import { UserEntity } from '../database/entities/user.entity';
import { BorrowedBookEntity } from '../database/entities/borrowed-books.entity';

const bookBorrowingService = new BookBorrowinService();

export async function borrowBook(
    req: Request,
    res: Response,
    databaseSource: DataSource
): Promise<Response> {
    const { error, value } = borrowBookValidator.validate({
        bookId: req.body.bookId,
    });

    if (error) {
        return res.status(400).send(error.message);
    }

    try {
        const book = await databaseSource
            .getRepository(BookEntity)
            .findOne({ where: { id: value.bookId } });

        if (!book) {
            return res.status(400).send({
                message: 'Book not found',
            });
        }

        const userId = +req['userId'];

        const user = await databaseSource
            .getRepository(UserEntity)
            .findOne({ where: { id: userId } });

        if (!user) {
            return res.status(400).send({
                message: 'User not found',
            });
        }

        const newBorrowedBookForStore = bookBorrowingService.borrowBook(user, book);

        const newBorrowedBook = await databaseSource
            .getRepository(BorrowedBookEntity)
            .save(newBorrowedBookForStore);

        return res.json(newBorrowedBook).status(200);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}
