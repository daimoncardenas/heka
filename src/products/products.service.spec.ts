import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma.service';
import { STATUS } from '../common';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  //? Mock PrismaService

  beforeEach(async () => {
    const mockPrismaService = {
      product: {
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
        ProductsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
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
    //? Test if the product is created successfully

    it('should create a product successfully', async () => {
      const mockProduct = {
        id: '1',
        name: 'Test Product',
        price: 100,
        description: 'Test',
        status: STATUS.ACTIVE,
        userId: 'user1',
      };
      prisma.product.create = jest.fn().mockResolvedValue(mockProduct);

      const result = await service.create(
        { name: 'Test Product', price: BigInt(10000), description: 'Test' },
        'user1',
      );

      expect(prisma.product.create).toHaveBeenCalledWith({
        data: {
          description: 'Test',
          name: 'Test Product',
          price: BigInt(10000),
          status: STATUS.ACTIVE,
          userId: 'user1',
        },
      });
      expect(result).toEqual({
        ...mockProduct,
        price: mockProduct.price.toString(),
      });
    });
  });

  describe('findAll', () => {
    //? Test if the service returns a paginated list of products

    it('should return a paginated list of products', async () => {
      const mockProducts = [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          description: 'Desc',
          status: STATUS.ACTIVE,
        },
      ];
      prisma.product.findMany = jest.fn().mockResolvedValue(mockProducts);
      prisma.product.count = jest.fn().mockResolvedValue(1);

      const input = {
        take: 10,
        skip: 0,
        search: '',
        start: '',
        end: '',
        status: STATUS.ACTIVE,
      };

      const result = await service.findAll(input);

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: { status: STATUS.ACTIVE },
        take: 10,
        skip: 0,
      });
      expect(result).toEqual({
        totalPages: 1,
        currentPage: 1,
        count: 1,
        totalItems: 1,
        data: mockProducts.map((product) => ({
          ...product,
          price: product.price.toString(),
        })),
      });
    });
  });

  describe('findOne', () => {
    //? Test if the service returns a product if it exists

    it('should return a product if it exists', async () => {
      const mockProduct = {
        id: '1',
        name: 'Product 1',
        price: 100,
        description: 'Desc',
        status: STATUS.ACTIVE,
        user: { id: 'user1' },
      };
      prisma.product.findFirst = jest.fn().mockResolvedValue(mockProduct);

      const result = await service.findOne('1');

      expect(prisma.product.findFirst).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { user: true },
      });
      expect(result).toEqual({
        ...mockProduct,
        price: mockProduct.price.toString(),
      });
    });
  });

  describe('update', () => {
    //? Test if the service updates a product successfully

    it('should update a product successfully', async () => {
      const mockProduct = {
        id: '1',
        name: 'Updated Product',
        price: 200,
        description: 'Updated Desc',
        status: STATUS.ACTIVE,
      };
      //? Mock del método update
      prisma.product.update = jest.fn().mockResolvedValue(mockProduct);
      const result = await service.update({
        id: '1',
        name: 'Updated Product',
        price: BigInt(200000),
        description: 'Updated Desc',
        status: STATUS.ACTIVE,
      });

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          description: 'Updated Desc',
          name: 'Updated Product',
          price: BigInt(200000),
          status: STATUS.ACTIVE,
        },
      });
      expect(result).toEqual({
        ...mockProduct,
        price: mockProduct.price.toString(),
      });
    });
  });
});
