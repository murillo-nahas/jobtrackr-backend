import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
  Param,
  Body,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { PaginatedResponse } from 'src/shared/types/paginated-response';
import { Application } from '@prisma/client';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';
import type { RequestWithUser } from 'src/shared/types/request-with-user';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { CreateApplicationDTO } from './dto/create-application.dto';
import { UpdateApplicationDTO } from './dto/update-application.dto';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllByUser(
    @Request() req: RequestWithUser,
    @Query() pagination: PaginationDTO,
  ): Promise<PaginatedResponse<Application>> {
    return this.applicationService.findAllByUser(req.user.userId, pagination);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Request() req: RequestWithUser, @Param('id') id: string): Promise<Application> {
    return this.applicationService.findById(id, req.user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req: RequestWithUser,
    @Body() createApplicationDto: CreateApplicationDTO,
  ): Promise<Application> {
    return this.applicationService.create(req.user.userId, createApplicationDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDTO,
  ): Promise<Application> {
    return this.applicationService.update(id, req.user.userId, updateApplicationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Request() req: RequestWithUser, @Param('id') id: string): Promise<void> {
    return this.applicationService.delete(id, req.user.userId);
  }
}
