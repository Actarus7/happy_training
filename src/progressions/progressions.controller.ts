import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgressionsService } from './progressions.service';
import { CreateProgressionDto } from './dto/create-progression.dto';
import { UpdateProgressionDto } from './dto/update-progression.dto';

@Controller('progressions')
export class ProgressionsController {
  constructor(private readonly progressionsService: ProgressionsService) {}

  @Post()
  create(@Body() createProgressionDto: CreateProgressionDto) {
    return this.progressionsService.create(createProgressionDto);
  }

  @Get()
  findAll() {
    return this.progressionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgressionDto: UpdateProgressionDto) {
    return this.progressionsService.update(+id, updateProgressionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressionsService.remove(+id);
  }
}
