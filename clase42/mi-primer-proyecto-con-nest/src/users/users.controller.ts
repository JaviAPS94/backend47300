import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//localhost:3000/users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //post /users
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // if (!createUserDto.first_name || !createUserDto.avatar)
    //   throw new HttpException('Invalid param', HttpStatus.BAD_REQUEST);
    return this.usersService.create(createUserDto);
  }

  //get /users
  @Get()
  findAll(@Query('limit') limit: string) {
    console.log(limit);
    const users = this.usersService.findAll();
    return { status: 'sucess', users };
  }

  //get /users/1
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id))
      throw new HttpException('Invalid param', HttpStatus.BAD_REQUEST);

    return this.usersService.findOne(+id);
  }

  //patch /users/1
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
