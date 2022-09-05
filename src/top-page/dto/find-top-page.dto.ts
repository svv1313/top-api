import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TopLevelCategory } from './../top-page.model';

export class FindTopPageDto {
  @IsOptional()
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @IsOptional()
  @IsString()
  secondCategory: string;

  @IsOptional()
  @IsString()
  alias: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  category: string;
}
