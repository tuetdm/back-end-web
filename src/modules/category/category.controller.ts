import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto } from "src/auth/dto";
import { CategoryService } from "./category.service";
import { Categories } from "@prisma/client";

@ApiBearerAuth()
@ApiTags("Category")
@Controller("category")
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getCategory(): Promise<Categories[]> {
    return await this.categoryService.getCategories();
  }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category =
      await this.categoryService.createCategory(createCategoryDto);
    return category; // You can return the created category as a response
  }

  @Get(":id")
  async getCategoryById(@Param("id") id: string): Promise<Categories> {
    const category = await this.categoryService.getCategoryById(
      parseInt(id, 10),
    );
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  @Put(":id")
  async updateCategory(
    @Param("id") id: string,
    @Body() newData: Partial<Categories>,
  ): Promise<Categories> {
    const updatedCategory = await this.categoryService.updateCategory(
      parseInt(id, 10),
      newData,
    );
    if (!updatedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return updatedCategory;
  }

  @Delete(":id")
  async deleteCategory(@Param("id") id: string) {
    const deletedCategory = await this.categoryService.deleteCategory(
      parseInt(id, 10),
    );
    if (!deletedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return { message: `Category with ID ${id} has been deleted` };
  }
}