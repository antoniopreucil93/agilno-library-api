import * as request from 'supertest';

import { createApp } from '../src/app';
import usersData from '../src/database/seeders/userData.seed';

let app;

let authToken;
let authUserToken;

let bookId;

const bookData = { title: 'new book', description: 'Lorem ipsum. Lorem ipsum' };

describe('Add book to library', () => {
    beforeAll(async () => {
        app = await createApp();
    });

    it('Admin login', async () => {
        await request(app)
            .post('/api/login')
            .send({ username: usersData[0].username, password: usersData[0].rawPassword })
            .expect(200)
            .then((response) => {
                const { token } = response.body;
                expect(token).not.toBeNull();
                authToken = token;
            });
    });

    it('Add book to library', async () => {
        await request(app)
            .post('/api/add-book')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ title: bookData.title, description: bookData.description })
            .expect(200)
            .then((response) => {
                const { id, title, description } = response.body;
                expect(title).toBe(bookData.title);
                expect(description).toBe(bookData.description);
                bookId = id;
            });
    });

    it('User login', async () => {
        await request(app)
            .post('/api/login')
            .send({ username: usersData[1].username, password: usersData[1].rawPassword })
            .expect(200)
            .then((response) => {
                const { token } = response.body;
                expect(token).not.toBeNull();
                authUserToken = token;
            });
    });

    it('Borrow book', async () => {
        await request(app)
            .post('/api/borrow-book')
            .set('Authorization', `Bearer ${authUserToken}`)
            .send({ bookId: bookId })
            .expect(200)
            .then((response) => {
                const { user, book } = response.body;

                expect(user.username).toBe(usersData[1].username);

                expect(book.title).toBe(bookData.title);
                expect(book.description).toBe(bookData.description);
            });
    });
});
