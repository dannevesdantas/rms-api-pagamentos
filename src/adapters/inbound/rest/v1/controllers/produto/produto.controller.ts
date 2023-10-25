import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IProdutoUseCase } from 'src/domain/ports/produto/produto.use_case.port';
import {
  AtualizaProdutoDTO,
  CriaProdutoDTO,
} from '../../presenters/produto.dto';

@Controller('produto')
export class ProdutoController {
  constructor(
    @Inject(IProdutoUseCase)
    private readonly produtoUseCase: IProdutoUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  async criar(@Body() produto: CriaProdutoDTO) {
    try {
      return await this.produtoUseCase.criarProduto(produto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Put('/:id')
  async atualizar(
    @Param('id') id: string,
    @Body() produto: AtualizaProdutoDTO,
  ) {
    try {
      return await this.produtoUseCase.editarProduto(id, produto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete('/:id')
  async remover(@Param('id') id: string) {
    try {
      return await this.produtoUseCase.excluirProduto(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get('/:id')
  async buscar(@Param('id') id: string) {
    try {
      return await this.produtoUseCase.buscarProduto(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get()
  async listar() {
    return await this.produtoUseCase.listarProdutos();
  }

  @Get('/categoria/:id')
  async listarPorCategoria(@Param('id') id: string) {
    try {
      return await this.produtoUseCase.listarProdutosPorCategoria(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
