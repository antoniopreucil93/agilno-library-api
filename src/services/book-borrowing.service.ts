import { Book, User } from '../models';
import { BorrowedBook } from '../models/borrowed-books.model';

export class BookBorrowinService {
    public borrowBook(user: User, book: Book) {
        const borrowedBook = new BorrowedBook();
        borrowedBook.user = user;
        borrowedBook.book = book;
        return borrowedBook;
    }
}
