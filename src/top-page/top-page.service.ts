import { CreateTopPageDTO } from './dto/create-top-page.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TopLevelCategory, TopPageModel } from './top-page.model';
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

  async find(firstLevel: TopLevelCategory) {
    return this.topPageModel
      .aggregate()
      .match({
        firstLevel,
      })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: { $push: { alias: '$alias', title: '$title' } },
      })
      .exec();
  }

  async findByText(text: string) {
    return this.topPageModel
      .find({
        $text: { $search: text, $caseSensitive: false },
      })
      .exec();
  }
}
