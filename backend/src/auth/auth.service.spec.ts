import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(), // Mock la méthode Prisma utilisée
            },
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should register a new user', async () => {
    const dto = {
      email: 'test@example.com',
      password: 'strongPass123',
      lastname: 'Doe',
      firstname: 'John',
      role: 'USER',
      pseudo: 'johndoe',
      sexe: 'M',
    };

    const fakeUser = {
      id_user: 1,
      email: dto.email,
      password: await argon.hash(dto.password),
      lastname: dto.lastname,
      firstname: dto.firstname,
      role: dto.role,
      pseudo: dto.pseudo,
      sexe: dto.sexe,
      url_photo_profil: null,
      address: null,
      city: null,
      description: null,
      createdAt: new Date(),
      acceptedPrivacyPolicy: false,
    };

    jest.spyOn(prisma.user, 'create').mockResolvedValue(fakeUser);

    const result = await authService.register(dto);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining( {
        email: dto.email,
        password: expect.any(String),
        lastname: dto.lastname,
        firstname: dto.firstname,
        role: dto.role,
        pseudo: dto.pseudo,
        sexe: dto.sexe,
       }),
    });

    expect(result).toEqual({ user: fakeUser });
  });

    console.log('test is a success');
});
