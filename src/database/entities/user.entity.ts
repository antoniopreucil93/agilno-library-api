import { UserRole } from '../../enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { TypeormTemplate } from './_template.entity';
import { BorrowedBookEntity } from './borrowed-books.entity';

@Entity({ name: 'users' })
export class UserEntity extends TypeormTemplate {
    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    password: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: () => UserRole.USER,
    })
    role: UserRole;

    @OneToMany(() => BorrowedBookEntity, (borrowedBookEntity) => borrowedBookEntity.user)
    userBorrowedBooks: BorrowedBookEntity[];
}
