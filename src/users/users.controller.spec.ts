import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUserInputDto } from './dto/input-find-all-user.dto';
import { FindAllUserResponseDto } from './dto/response-find-all-user.dto';
import { Users } from './dto/users.dto';
import { STATUS } from '../common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  //? Mock UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });


  //? Test if the controller is defined


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {

    
    //? Test if the user is created successfully


    it('should call UsersService.create and return the created user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password',
      };
      const mockUser: Users = { id: '1', email: 'test@example.com', name: 'Test User', status: 'INACTIVE', createdAt: new Date(), updatedAt: new Date() };

      jest.spyOn(service, 'create').mockResolvedValue(mockUser);

      const result = await controller.create(createUserDto);

      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    

    //? Test if the list of users is returned successfully
    
    
    it('should call UsersService.findAll and return a paginated list of users', async () => {
      const findAllInput: FindAllUserInputDto = { take: 10, skip: 0, search: '', start: '', end: '', status: STATUS.INACTIVE };
      const mockResponse: FindAllUserResponseDto = {
        totalPages: 1,
        currentPage: 1,
        count: 1,
        totalItems: 1,
        data: [{ id: '1', email: 'test@example.com', name: 'Test User', status: 'ACTIVE', createdAt: new Date(), updatedAt: new Date() }],
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(mockResponse);

      const result = await controller.findAll(findAllInput);

      expect(service.findAll).toHaveBeenCalledWith(findAllInput);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    

    //? Test if the user is found successfully
    

    it('should call UsersService.findOne and return the user', async () => {
      const userId = '1';
      const mockUser: Users = { id: '1', email: 'test@example.com', name: 'Test User', status: 'ACTIVE', createdAt: new Date(), updatedAt: new Date() };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);

      const result = await controller.findOne(userId);

      expect(service.findOne).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    
    
    //? Test if the user is updated successfully
    
    
    it('should call UsersService.update and return the updated user', async () => {
      const updateUserDto: UpdateUserDto = {
        id: '1',
        email: 'test@example.com',
        name: 'Updated User',
        password: 'newpassword',
        status: STATUS.ACTIVE,
      };
      const mockUpdatedUser: Users = { id: '1', email: 'test@example.com', name: 'Updated User', status: 'ACTIVE', createdAt: new Date(), updatedAt: new Date() };

      jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedUser);

      const result = await controller.update(updateUserDto);

      expect(service.update).toHaveBeenCalledWith(updateUserDto);
      expect(result).toEqual(mockUpdatedUser);
    });
  });
});
