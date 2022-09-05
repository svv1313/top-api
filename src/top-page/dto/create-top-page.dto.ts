import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';
import { Hhdata, TopLevelCategory, TopPageAdvantages } from '../top-page.model';

export class CreateTopPageDTO {
  @IsEnum(TopLevelCategory)
  firstLevel: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @Type(() => Hhdata)
  hh?: Hhdata;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantages)
  advantages: TopPageAdvantages[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
