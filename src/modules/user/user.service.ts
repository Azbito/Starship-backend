import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(res: Response, createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email
      }
    })

    if (userExists) {
      throw new HttpException({ message: 'User already exists!' }, HttpStatus.CONFLICT);
    }

    res.status(HttpStatus.CREATED).send({ message: "User created!" });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  async updateMe(res: Response, updateUserDto: UpdateUserDto, id: string) {
    await this.prisma.user.update({
      data: updateUserDto,
      where: {
        id
      }
    })
    res.status(HttpStatus.OK).send({ message: "User updated!" });
  }

  async deleteMe(res: Response, id: string) {
    await this.prisma.user.delete({
      where: {
        id
      }
    })
    res.status(HttpStatus.OK).send({ message: "User updated!" });
  }
}