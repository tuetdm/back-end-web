import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from 'src/auth/dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Post as PostDB } from '@prisma/client';
import { title } from 'process';

@ApiBearerAuth()
@ApiTags("Post")
@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    @Post()
    async createPost(@Body() createPostDto: CreatePostDto) {
      const post = await this.postService.createPost(createPostDto);
      return post; // You can return the created product as a response
    }

    @Put(":id")
    async updatePost(
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto,
    ): Promise<PostDB> {
    const updatedPost = await this.postService.updatePost(
      parseInt(id, 10),
      updatePostDto,
    );
    if (!updatedPost) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return updatedPost;
  }

    @Get()
    async getPost(): Promise<PostDB[]>{
      return await this.postService.getPost()
    }
    
    @Get(":id")
    async getPostById(@Param("id") id: string): Promise<PostDB> {
      const post = await this.postService.getPostById(
        parseInt(id, 10),
      );
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return post;
    }

    @Delete(":id")
    async deletePost(@Param("id") id: string) {
    const deletedCategory = await this.postService.deletePost(
      parseInt(id, 10),
    );
    if (!deletedCategory) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return { message: `Post with ID ${id} has been deleted` };
  }
  
  @Get('search/:title')
  async searchTitle(@Param('title') title: string){
    return this.postService.searchTitle(title)
  }
}
