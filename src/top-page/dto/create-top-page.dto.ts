import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TopLevelCategory } from '../top-page.model';

class TopPageAdvantagesDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class HhdataDTO {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;
}

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

  @IsOptional()
  @Type(() => HhdataDTO)
  hh?: HhdataDTO;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantagesDTO)
  advantages: TopPageAdvantagesDTO[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
