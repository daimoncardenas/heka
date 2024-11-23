import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ResponseAuthDto } from './dto/response-auth.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      login: jest.fn(), 
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService, 
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });


  
  //? Test if the controller is defined


  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
  

    //? Test if the user is authenticated successfully
  
    
    it('should return a token when login is successful', async () => {
      const authDto: AuthDto = { email: 'test@example.com', password: 'password' };
      const mockResponse: ResponseAuthDto = { token: 'mockToken' };

      
      jest.spyOn(authService, 'login').mockResolvedValue(mockResponse);

      const result = await authController.login(authDto);

      
      expect(authService.login).toHaveBeenCalledWith(authDto);
      expect(result).toEqual(mockResponse);
    });

    
    //? Test if the user is not authenticated successfully


    it('should throw an error if authentication fails', async () => {
      
      const authDto: AuthDto = { email: 'invalid@example.com', password: 'wrongpassword' };

      
      jest.spyOn(authService, 'login').mockRejectedValue(new Error('Invalid credentials'));

      await expect(authController.login(authDto)).rejects.toThrow('Invalid credentials');

      
      expect(authService.login).toHaveBeenCalledWith(authDto);
    });
  });
});
