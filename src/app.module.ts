import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthenticationModule,
    UserModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
