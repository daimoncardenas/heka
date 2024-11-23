import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';
import { FindAllProductInputDto } from './dto/input-find-all-product.dto';
import { FindAllProductResponseDto } from './dto/response-find-all-products.dto';
import { Products } from './dto/products.dto';
import {
  ProductCreateError,
  ProductNotFoundError,
  ProductUpdateError,
} from './errors/productsErrors';
import { STATUS } from '../common';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  //? Create a new product

  async create(
    createProductDto: CreateProductDto,
    userId: string,
  ): Promise<Products> {
    try {
      const product = await this.prisma.product.create({
        data: {
          description: createProductDto.description,
          name: createProductDto.name,
          price: createProductDto.price,
          status: STATUS.ACTIVE,
          userId,
        },
      });

      if (!product) {
        throw new ProductCreateError('Product error to create');
      }

      //? Emit notification to all users about the new product
      this.notificationsGateway.sendProductCreatedNotification({
        id: product.id,
        name: product.name,
        price: product.price.toString(),
      });

      return {
        ...product,
        price: product.price.toString(),
      };
    } catch (e) {
      console.log(e);
      return e;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  //? Find all products

  async findAll(
    input: FindAllProductInputDto,
  ): Promise<FindAllProductResponseDto> {
    try {
      const { take, skip, search, end, start, status } = input;

      console.log(input);
      const where = {};

      if (status) {
        where['status'] = status;
      }

      if (start || end) {
        where['createdAt'] = {
          ...(start && { gte: new Date(start) }),
          ...(end && {
            lt: new Date(new Date(end).setDate(new Date(end).getDate() + 1)),
          }),
        };
      }

      if (search) {
        where['name'] = {
          contains: search,
          mode: 'insensitive',
        };
      }

      console.log('wherehere', where);
      const totalItems = await this.prisma.product.count({
        where,
      });

      const count = await this.prisma.product.count({});
      const totalPages = Math.ceil(totalItems / take);
      const currentPage = Math.ceil(skip / take) + 1;

      const products = await this.prisma.product.findMany({
        where,
        take,
        skip,
      });

      return {
        totalPages,
        currentPage,
        count: count ? 1 : 0,
        totalItems,
        data: products.map((product) => {
          return {
            ...product,
            price: product.price.toString(),
          };
        }),
      };
    } catch (e) {
      console.log(e);
      return e;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  //? Find one product

  async findOne(id: string): Promise<Products> {
    try {
      const product = await this.prisma.product.findFirst({
        where: {
          id: id,
        },
        include: {
          user: true,
        },
      });

      console.log('productFindOne', product);
      if (!product) {
        throw new ProductNotFoundError('Product not found');
      }
      return {
        ...product,
        price: product.price.toString(),
      };
    } catch (e) {
      console.log(e);
      return e;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  //? Update a product

  async update(updateProductDto: UpdateProductDto): Promise<Products> {
    try {
      const product = await this.prisma.product.update({
        where: {
          id: updateProductDto.id,
        },
        data: {
          description: updateProductDto.description,
          name: updateProductDto.name,
          price: updateProductDto.price,
          status: updateProductDto.status,
        },
      });

      if (!product) {
        throw new ProductUpdateError('Product error to update');
      }
      return {
        ...product,
        price: product.price.toString(),
      };
    } catch (e) {
      console.log(e);
      return e;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  /*   remove(id: number) {
    return `This action removes a #${id} product`;
  } */
}
