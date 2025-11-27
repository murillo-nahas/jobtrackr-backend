import { IsOptional, IsNumber, Min, Max } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;
}
