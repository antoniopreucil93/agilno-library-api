import * as request from 'supertest';

import { createApp } from '../src/app';

let app;
let authToken;
let bookId;

const bookData = { title: 'new book', description: 'Lorem ipsum. Lorem ipsum' };

describe('Add book to library', () => {
    beforeAll(async () => {
        app = await createApp();
    });

    it('Admin login', async () => {
        await request(app)
            .post('/api/login')
            .send({ username: 'admin@mail.com', password: '123456' })
            .expect(200)
            .then((response) => {
                const { token } = response.body;
                expect(token).not.toBeNull();
                authToken = token;
            })
            .catch((err) => {
                console.log(err, ' check err');
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

    it('Fetch book from library', async () => {
        await request(app)
            .delete(`/api/delete-book/${bookId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .then((response) => {
                const { message } = response.body;
                expect(message).toBe('Book deleted');
            });
    });

    it('Fetch Deleted book from library', async () => {
        await request(app)
            .get(`/api/fetch-book/${bookId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(404)
            .then((response) => {
                const { message } = response.body;
                expect(message).toBe('Book not found');
            });
    });
});
