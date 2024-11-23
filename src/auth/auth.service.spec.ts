import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';


describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  //? Mock PrismaService and JwtService

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
    $disconnect: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  
  //? Test if the service is defined


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {

    
    //? Test if the user is logged in successfully


    it('should return a token when login is successful', async () => {
      const authDto: AuthDto = { email: 'test@example.com', password: 'password' };
      const mockUser = { id: '1', email: 'test@example.com', password: await bcrypt.hash('password', 10) };
      const mockToken = 'mockToken';

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.login(authDto);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: authDto.email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(authDto.password, mockUser.password);
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: mockUser.id });
      expect(result).toEqual({ token: mockToken });
    });


    
    //? Test if the user is not found


    it('should throw an UnauthorizedException if user is not found', async () => {
      const authDto: AuthDto = { email: 'invalid@example.com', password: 'password' };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.login(authDto)).rejects.toThrow(UnauthorizedException);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: authDto.email } });
    });

  });
});
