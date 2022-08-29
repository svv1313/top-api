import { JwtAuthGuard } from './../guards/jwt.guard';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(
        `${REVIEW_NOT_FOUND} ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('byProduct/:productId')
  async byProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }
}
