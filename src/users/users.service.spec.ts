import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
import { STATUS } from '../common';
import * as bcrypt from 'bcrypt';
import { UserCreateError, UserNotFoundError, UserUpdateError } from './errors/usersErrors';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;


  //? Mock PrismaService

  beforeEach(async () => {
    const mockPrismaService = {
      user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        count: jest.fn(),
      },
      $disconnect: jest.fn(),
    } as unknown as jest.Mocked<PrismaService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  //? Test if the service is defined


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {

    
    //? Test if the user is created successfully


    it('should create a user successfully', async () => {
      const createUserDto = { email: 'test@example.com', name: 'Test User', password: 'password' };
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User', status: STATUS.INACTIVE };

      jest.spyOn(bcrypt, 'hash').mockImplementation(async () => 'hashedPassword');
      prisma.user.create = jest.fn().mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          password: 'hashedPassword',
          status: STATUS.INACTIVE,
        },
      });
      expect(result).toEqual(mockUser);
    });

   
  });

  describe('findAll', () => {
    

    //? Test if the users are found successfully

    
    it('should return a paginated list of users', async () => {
      const mockUsers = [{ id: '1', email: 'test@example.com', name: 'Test User', status: STATUS.INACTIVE }];
      const input = { take: 10, skip: 0, search: '', start: '', end: '', status: STATUS.INACTIVE };

      prisma.user.findMany = jest.fn().mockResolvedValue(mockUsers);
      prisma.user.count = jest.fn().mockResolvedValue(1);

      const result = await service.findAll(input);

      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: { status: STATUS.INACTIVE },
        take: 10,
        skip: 0,
      });
      expect(result).toEqual({
        totalPages: 1,
        currentPage: 1,
        count: 1,
        totalItems: 1,
        data: mockUsers,
      });
    });
  });

  describe('findOne', () => {
    

    //? Test if the user is found by ID
    
    
    it('should return a user if it exists', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User', Product: [] };

      prisma.user.findFirst = jest.fn().mockResolvedValue(mockUser);

      const result = await service.findOne('1');

      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { Product: true },
      });
      expect(result).toEqual(mockUser);
    });

   
  });

  describe('update', () => {
    
    
    //? Test if the user is updated successfully
    
    
    it('should update a user successfully', async () => {
      const updateUserDto = { id: '1', name: 'Updated User', password: 'newPassword', status: STATUS.ACTIVE };
      const mockUser = { id: '1', email: 'test@example.com', name: 'Updated User', status: STATUS.ACTIVE };

      jest.spyOn(bcrypt, 'hash').mockImplementation(async () => 'hashedPassword');
      prisma.user.update = jest.fn().mockResolvedValue(mockUser);

      const result = await service.update(updateUserDto);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: updateUserDto.id },
        data: {
          name: updateUserDto.name,
          password: 'hashedPassword',
          status: STATUS.ACTIVE,
        },
      });
      expect(result).toEqual(mockUser);
    });

   
  });
});
