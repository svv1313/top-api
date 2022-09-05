import { FindTopPageDto } from './dto/find-top-page.dto';
import { CreateTopPageDTO } from './dto/create-top-page.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TopPageModel } from './top-page.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel)
    private readonly topPageModel: ModelType<TopPageModel>,
  ) {}

  async create(dto: CreateTopPageDTO) {
    return this.topPageModel.create(dto);
  }

  async findByAlias(alias) {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async findById(id: string) {
    return this.topPageModel.findById(id).exec();
  }

  async deleteById(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateTopPageDTO) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async find(dto: FindTopPageDto) {
    return this.topPageModel
      .find(dto, { alias: 1, secondCategory: 1, title: 1 })
      .exec();
  }
}
