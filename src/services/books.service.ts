import { Book } from '../models';

export class BookService {
    public createBook(title: string, description: string): Book {
        const newBook = new Book();
        newBook.title = title;
        newBook.description = description;
        return newBook;
    }
}
