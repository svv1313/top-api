import { AuthDto } from './../src/auth/dto/auth.dto';
import { disconnect } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  WRONG_PASSWORD_ERROR,
  USER_NOT_FOUND,
} from '../src/auth/auth.constants';

const loginDto: AuthDto = {
  login: 'new-user2@gmail.com',
  password: '1',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }) => {
        expect(body.access_token).toBeDefined();
      });
  });

  it('/auth/login (POST) - fail (wrong password)', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: '123' })
      .expect({
        statusCode: 401,
        message: WRONG_PASSWORD_ERROR,
        error: 'Unauthorized',
      });
  });

  it('/auth/login (POST) - fail (wrong email)', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, login: '123' })
      .expect({
        statusCode: 401,
        message: USER_NOT_FOUND,
        error: 'Unauthorized',
      });
  });

  afterAll(() => {
    disconnect();
  });
});
