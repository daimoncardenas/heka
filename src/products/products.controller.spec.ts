import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProductInputDto } from './dto/input-find-all-product.dto';
import { FindAllProductResponseDto } from './dto/response-find-all-products.dto';
import { Products } from './dto/products.dto';
import { STATUS } from '../common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  //? Mock product data

  const mockProduct: Products = {
    id: '1',
    name: 'Test Product',
    price: '100',
    description: 'Test Description',
    status: STATUS.ACTIVE,
    userId: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockProductResponse: FindAllProductResponseDto = {
    totalPages: 1,
    currentPage: 1,
    count: 1,
    totalItems: 1,
    data: [mockProduct],
  };

  const mockProductsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  //? Test if the controller is defined


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {

    
    //? Test if the product is created successfully


    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: BigInt(100),
        description: 'Test Description',
      };
      const req = { user: { userId: 'user1' } };
      mockProductsService.create.mockResolvedValue(mockProduct);

      const result = await controller.create(createProductDto, req);

      expect(service.create).toHaveBeenCalledWith(createProductDto, 'user1');
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {

    
    //? Test if the list of products


    it('should return a list of products', async () => {
      const findAllInput: FindAllProductInputDto = {
        take: 10,
        skip: 0,
        search: '',
        start: '',
        end: '',
        status: STATUS.ACTIVE,
      };
      mockProductsService.findAll.mockResolvedValue(mockProductResponse);

      const result = await controller.findAll(findAllInput);

      expect(service.findAll).toHaveBeenCalledWith(findAllInput);
      expect(result).toEqual(mockProductResponse);
    });
  });

  describe('findOne', () => {
    

    //? Test if the product is found by ID
    

    it('should return a product by ID', async () => {
      mockProductsService.findOne.mockResolvedValue(mockProduct);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockProduct);
    });



    //? Test if the product is not found


    it('should throw an error if the product is not found', async () => {
      mockProductsService.findOne.mockRejectedValue(new Error('Product not found'));

      await expect(controller.findOne('1')).rejects.toThrow('Product not found');
    });
  });

  describe('update', () => {


    //? Test if the product is updated


    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = {
        id: '1',
        name: 'Updated Product',
        price: BigInt(200),
        description: 'Updated Description',
        status: STATUS.ACTIVE,
      };
      mockProductsService.update.mockResolvedValue({
        ...mockProduct,
        name: 'Updated Product',
        price: '200',
        description: 'Updated Description',
      });

      const result = await controller.update(updateProductDto);

      expect(service.update).toHaveBeenCalledWith(updateProductDto);
      expect(result).toEqual({
        ...mockProduct,
        name: 'Updated Product',
        price: '200',
        description: 'Updated Description',
      });
    });
  });
});

