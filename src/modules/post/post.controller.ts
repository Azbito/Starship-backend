import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Response } from 'express';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  create(res: Response, @Body() createPostDto: CreatePostDto, @CurrentUser() user: User) {
    return this.postService.create(res, createPostDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.postService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.postService.findOne(id, user.id);
  }

  @Patch(':id')
  update(res: Response, @Param('id') id: string, @CurrentUser() user: User, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(res, id, user.id, updatePostDto);
  }

  @Delete(':id')
  remove(res: Response, @Param('id') id: string, @CurrentUser() user: User) {
    return this.postService.delete(res, id, user.id);
  }
}