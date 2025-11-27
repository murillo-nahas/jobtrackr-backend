import { IsDateString, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApplicationStatus } from 'src/shared/enums/application-status.enum';

export class UpdateApplicationDTO {
  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsUrl()
  jobUrl?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @IsOptional()
  @IsString()
  additionalNotes?: string;

  @IsOptional()
  @IsDateString()
  appliedAt?: string;
}
