import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './dto/register.dto';
import { compare, hash } from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDTO): Promise<{ access_token: string }> {
    const existingUser = await this.userService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await hash(dto.password, 10);

    const user = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(dto: LoginDTO): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
