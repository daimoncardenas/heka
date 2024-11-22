import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProductInputDto } from './dto/input-find-all-product.dto';
import { FindAllProductResponseDto } from './dto/response-find-all-products.dto';
import { Products } from './dto/products.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //? Create a new product

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto, @Req() req: any): Promise<Products> {
    const userId = req.user.userId;
    return await this.productsService.create(createProductDto, userId);
  }

  //? Find all products

  @Get('find-all')
  async findAll(
    @Query() GetAllProductInputDto: FindAllProductInputDto,
  ): Promise<FindAllProductResponseDto> {
    return await this.productsService.findAll(GetAllProductInputDto);
  }

  //? Find one product

  @Get(':id')
  @UsePipes(new ValidationPipe({
    skipMissingProperties: true,  //? Skip missing properties
    transform: true, //? Transform the payload to the expected type
  }),) 
  async findOne(@Param('id') id: string): Promise<Products> {
    return await this.productsService.findOne(id);
  }

  //? Update a product

  @Patch()
  async update(
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(updateProductDto);
  }

  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  } */
}
