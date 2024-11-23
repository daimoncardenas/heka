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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //? Create a new product

  @Post('create')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Producto creado correctamente.',
    type: Products,
  })
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: any,
  ): Promise<Products> {
    const userId = req.user.userId;
    return await this.productsService.create(createProductDto, userId);
  }

  //? Find all products

  @Get('find-all')
  @ApiOperation({ summary: 'Find all products' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos devuelta correctamente.',
    type: FindAllProductResponseDto,
  })
  async findAll(
    @Query() GetAllProductInputDto: FindAllProductInputDto,
  ): Promise<FindAllProductResponseDto> {
    return await this.productsService.findAll(GetAllProductInputDto);
  }

  //? Find one product

  @Get(':id')
  @UsePipes(
    new ValidationPipe({
      skipMissingProperties: true, //? Skip missing properties
      transform: true, //? Transform the payload to the expected type
    }),
  )
  @ApiOperation({ summary: 'Find one product' })
  @ApiResponse({
    status: 200,
    description: 'Producto devuelto correctamente.',
    type: Products,
  })
  async findOne(@Param('id') id: string): Promise<Products> {
    return await this.productsService.findOne(id);
  }

  //? Update a product

  @Patch()
  @ApiOperation({ summary: 'Update a product' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado correctamente.',
    type: Products,
  })
  async update(@Body() updateProductDto: UpdateProductDto): Promise<Products> {
    return await this.productsService.update(updateProductDto);
  }


}
