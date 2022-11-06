import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { BookEntity } from './book.entity';
import { UserEntity } from './user.entity';
import { TypeormTemplate } from './_template.entity';

@Entity({
    name: 'borrowed_books',
})
export class BorrowedBookEntity extends TypeormTemplate {
    @ManyToOne(() => UserEntity, (userEntity) => userEntity.userBorrowedBooks)
    user: UserEntity;

    @ManyToOne(() => BookEntity, (BookEntity) => BookEntity.borrowedBooks)
    book: BookEntity;
}
