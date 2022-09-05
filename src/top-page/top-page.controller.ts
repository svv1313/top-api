import { JwtAuthGuard } from './../guards/jwt.guard';
import { IdValidationPipe } from './../pipes/ad-validation.pipe';
import { TopPageService } from './top-page.service';
import { CreateTopPageDTO } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ALIAS_ALREADY_EXIST, TOP_PAGE_NOT_FOUND } from './top-page.constans';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateTopPageDTO) {
    const IsAliasExist = await this.topPageService.findByAlias(dto.alias);
    if (IsAliasExist) {
      throw new BadRequestException(ALIAS_ALREADY_EXIST);
    }
    return this.topPageService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    return this.topPageService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedTopPage = await this.topPageService.deleteById(id);
    if (!deletedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
  }

  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: TopPageModel,
  ) {
    const updatedTopPage = await this.topPageService.updateById(id, dto);
    if (!updatedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
    return updatedTopPage;
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {
    const foundTopPage = await this.topPageService.find(dto);
    if (!foundTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
    return foundTopPage;
  }
}
