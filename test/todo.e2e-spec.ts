import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TodoController (e2e)', () => {
  let app: INestApplication;
  const headers = {
    'Content-Type': 'application/json',
  };
  let id: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('v1');
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  // create a todo
  describe('POST /v1/todos', () => {
    it('should create a new todo plan with valid request', async () => {
      const response = await request(app.getHttpServer())
        .post(`/v1/todos`)
        .set(headers)
        .send({
          title: 'E2E TEST CASE',
          completed: false,
        });

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body._id).toBeDefined();
      id = response.body._id;
    });

    it('should return failed with invalid request to create todo', async () => {
      const response = await request(app.getHttpServer())
        .post(`/v1/todos`)
        .set(headers)
        .send({
          name: '',
          completed: false,
        });

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual({
        message: [
          'title should not be empty',
        ],
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  // return all todos
  describe('GET /v1/todos', () => {
    it('should return all the todos with valid request', async () => {
      const response = await request(app.getHttpServer())
        .get(`/v1/todos`)
        .set(headers)
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  // return a specific todo
  describe('GET /v1/todos/{id}', () => {
    it('should return the specific todo with valid id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/v1/todos/${id}`)
        .set(headers)
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body._id).toBeDefined();
      expect(response.body.title).toBeDefined();
      expect(response.body.completed).toBeDefined();
    });

    it('should return failed for the wrong todo id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/v1/todos/${id}e404`)
        .set(headers)
        .send();

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('Not Found');
      expect(response.body.message).toEqual('todo not found!');
    });
  });

  // edit a todo
  describe('PATCH /v1/todos/{id}', () => {
    it('should update the todo information with valid request', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/v1/todos/${id}`)
        .set(headers)
        .send({ title: 'E2E TEST CASE UP', completed: true });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });

    it('should return failed to update for a wrong todo id', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/v1/todos/${id}e404`)
        .set(headers)
        .send({ title: 'E2E TEST CASE UP2', completed: true });

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('Not Found');
    });

    it('should return failed with invalid request to update todo', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/v1/todos/${id}`)
        .set(headers)
        .send({ completed: 120 });

      expect(response.status).toBe(400);
      expect(response.body.error).toEqual('Bad Request');
      expect(response.body.message[0]).toEqual(
        'completed must be a boolean value',
      );
    });
  });

  // delete a todo
  describe('DELETE /v1/todos/{id}', () => {
    it('should delete successfully the todo with valid id', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/v1/todos/${id}`)
        .set(headers)
        .send();

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('The data has been deleted successfully');
    });

    it('should return failed to delete for a wrong todo id', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/v1/todos/${id}`)
        .set(headers)
        .send();

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('Not Found');
      expect(response.body.message).toEqual('failed to delete todo!');
    });
  });
});
