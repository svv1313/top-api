import { IsEnum, IsOptional } from 'class-validator';
import { TopLevelCategory } from './../top-page.model';

export class FindTopPageDto {
  @IsOptional()
  @IsEnum(TopLevelCategory)
  firstLevel: TopLevelCategory;
}
