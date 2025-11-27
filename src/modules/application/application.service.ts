import { PaginatedResponse } from './../../shared/types/paginated-response';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateApplicationDTO } from './dto/create-application.dto';
import { Application } from '@prisma/client';
import { UpdateApplicationDTO } from './dto/update-application.dto';
import { PaginationDTO } from 'src/shared/dto/pagination.dto';

@Injectable()
export class ApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, data: CreateApplicationDTO): Promise<Application> {
    return this.prisma.application.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAllByUser(
    userId: string,
    pagination: PaginationDTO,
  ): Promise<PaginatedResponse<Application>> {
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.application.findMany({
        where: {
          userId,
          deletedAt: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: Number(pagination.limit ?? 10),
      }),
      this.prisma.application.count({
        where: {
          userId,
          deletedAt: null,
        },
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page: pagination.page ?? 1,
        limit: pagination.limit ?? 10,
        totalPages: Math.ceil(total / (pagination.limit ?? 10)),
      },
    };
  }

  async findById(id: string, userId: string): Promise<Application> {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });

    if (!application || application.deletedAt) {
      throw new NotFoundException('Application not found');
    }

    if (application.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return application;
  }

  async update(id: string, userId: string, data: UpdateApplicationDTO): Promise<Application> {
    await this.findById(id, userId);

    return this.prisma.application.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.findById(id, userId);

    await this.prisma.application.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
