import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BorrowedBookEntity } from './borrowed-books.entity';
import { TypeormTemplate } from './_template.entity';

@Entity({ name: 'books' })
export class BookEntity extends TypeormTemplate {
    @Column({
        type: 'varchar',
        nullable: false,
    })
    title: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    description: string;

    @OneToMany(() => BorrowedBookEntity, (borrowedBookEntity) => borrowedBookEntity.book)
    borrowedBooks: BorrowedBookEntity[];
}
