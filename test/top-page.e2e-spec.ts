import { ALIAS_ALREADY_EXIST } from './../src/top-page/top-page.constans';
import { CreateTopPageDTO } from './../src/top-page/dto/create-top-page.dto';
import { AuthDto } from './../src/auth/dto/auth.dto';
import { disconnect, Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ID_VALIDATION_ERROR } from '../src/pipes/id-validation.constans';

const alias = `E2E_alias1${Math.floor(Math.random() * 100)}`;

const testDto: CreateTopPageDTO = {
  firstLevel: 1,
  secondCategory: 'test second category',
  alias,
  title: 'new title 1',
  category: 'category1',
  hh: {
    count: 5,
    juniorSalary: 1000,
    middleSalary: 2000,
    seniorSalary: 3000,
  },
  advantages: [
    {
      title: 'advantage 1',
      description: 'description advantage 1',
    },
    {
      title: 'advantage 2',
      description: 'description advantage 2',
    },
  ],
  seoText: 'SEO text',
  tagsTitle: 'New tag style',
  tags: ['lol', 'kek', 'chebureck'],
};

const loginDto: AuthDto = {
  login: 'new-user2@gmail.com',
  password: '1',
};

describe('TopPageController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);
    token = body.access_token;
  });

  it('/top-page/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/top-page/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
      });
  });

  it('/top-page/create (POST) - fail(Alias Already Exist)', () => {
    return request(app.getHttpServer())
      .post('/top-page/create')
      .send({ ...testDto, alias: 'E2E_alias' })
      .expect({
        statusCode: 400,
        message: ALIAS_ALREADY_EXIST,
        error: 'Bad Request',
      });
  });

  it('/top-page/create (POST) - fail', () => {
    return request(app.getHttpServer())
      .post('/top-page/create')
      .send({ ...testDto, firstLevel: 10 })
      .expect(400);
  });

  it('/top-page/:id (GET) - success', async () => {
    return request(app.getHttpServer())
      .get('/top-page/' + createdId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.alias).toBe(alias);
      });
  });

  it('/top-page/:id (GET) - fail', async () => {
    return request(app.getHttpServer())
      .get('/top-page/' + new Types.ObjectId().toHexString())
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.alias).toBeUndefined();
      });
  });

  it('/top-page/:id (GET) - fail(Top page id is not ObjectId)', async () => {
    return request(app.getHttpServer())
      .get('/top-page/' + '123321')
      .expect({
        statusCode: 400,
        message: ID_VALIDATION_ERROR,
        error: 'Bad Request',
      });
  });

  it('/top-page (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/top-page')
      .send({ category: testDto.category })
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBeGreaterThan(0);
      });
  });

  it('/top-page (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/top-page')
      .send({ category: "category which can't be defined" })
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0);
      });
  });

  it('/top-page (POST) - success', async () => {
    const category = 'new category';
    return request(app.getHttpServer())
      .patch('/top-page/' + createdId)
      .send({ category })
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.category).toBe(category);
      });
  });

  it('/top-page/:id (DELETE) - success', async () => {
    return request(app.getHttpServer())
      .delete('/top-page/' + createdId)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  afterAll(() => {
    disconnect();
  });
});
