
import { Controller, Get, Post, Body, Patch, Param, Delete,Req, UseGuards, Query } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Request } from 'express';
import { FilterDto } from './dto/filter.dto';
import { CreateCategoryDto } from './dto/create-category.dto';



@Controller('class')
@UseGuards(AuthGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createClassDto: CreateClassDto) {
    const userId = req.user?.id??'';
    return this.classService.create(userId,createClassDto);
  }
  
  @Get()
  findAll(
    @Query() filterDto: FilterDto
  ) {
    return this.classService.findAll(filterDto);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Req() req: Request, @Body() updateClassDto: UpdateClassDto) {
  //   const userId = req.user?.id??'';
  //   return this.classService.update(+id,userId, updateClassDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.classService.remove(+id);
  // }
}

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  async createClass(@Body() createCategory: CreateCategoryDto) {
    return await this.classService.createCategory(createCategory);
  }

  @Get()
  async getAllCategory() {
    return await this.classService.getAllCategory();
  }
}


@Controller('classtype')
@UseGuards(AuthGuard)
export class ClassTypeController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  async createType(@Body() createClassType: CreateCategoryDto) {
    return await this.classService.createClassType(createClassType);
  }

  @Get()
  async getAllClassType() {
    return await this.classService.getAllClassType();
  }
}