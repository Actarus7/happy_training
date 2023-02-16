import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FrienshipsService } from './frienships.service';
import { CreateFrienshipDto } from './dto/create-frienship.dto';
import { UpdateFrienshipDto } from './dto/update-frienship.dto';

@Controller('frienships')
export class FrienshipsController {
  constructor(private readonly frienshipsService: FrienshipsService) {}

  @Post()
  create(@Body() createFrienshipDto: CreateFrienshipDto) {
    return this.frienshipsService.create(createFrienshipDto);
  }

  @Get()
  findAll() {
    return this.frienshipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frienshipsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFrienshipDto: UpdateFrienshipDto) {
    return this.frienshipsService.update(+id, updateFrienshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frienshipsService.remove(+id);
  }
}
