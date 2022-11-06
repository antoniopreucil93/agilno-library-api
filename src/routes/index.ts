import * as express from 'express';

import { addBook } from './add-book.route';
import { updateBook } from './update-book.route';
import { findOneBook } from './find-one-book.route';
import { findAllBooks } from './find-all-books.route';
import { login } from './login.route';
import { register } from './registration.route';
import { role, verifyToken } from '../middlewares/auth.middleware';
import { UserRole } from '../enum';
import { deleteBook } from './delete-book.route';
import { borrowBook } from './borrow-book.route';
import datasource from '../database/datasource';

const router = express.Router();

export default function routes(): express.Router {
    // auth routes
    router.post('/register', (req, res) => register(req, res, datasource));
    router.post('/login', (req, res) => login(req, res, datasource));

    // book routes
    router.get('/fetch-books', [verifyToken], (req, res) => findAllBooks(req, res, datasource));
    router.get('/fetch-book/:bookId', [verifyToken], (req, res) =>
        findOneBook(req, res, datasource)
    );
    router.post('/add-book', [verifyToken, role([UserRole.ADMIN])], (req, res) =>
        addBook(req, res, datasource)
    );
    router.patch('/update-book/:bookId', [verifyToken, role([UserRole.ADMIN])], (req, res) =>
        updateBook(req, res, datasource)
    );
    router.delete('/delete-book/:bookId', [verifyToken, role([UserRole.ADMIN])], (req, res) =>
        deleteBook(req, res, datasource)
    );

    // borrow book route
    router.post('/borrow-book', [verifyToken, role([UserRole.USER])], (req, res) =>
        borrowBook(req, res, datasource)
    );

    // 404 NOT FOUND route
    router.use('*', function (_, res) {
        res.json('404 NOT FOUND!').status(404);
    });

    return router;
}
