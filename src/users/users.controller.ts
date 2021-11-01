import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  addUser(
    @Body('username') userUsername: string,
    @Body('bio') userBio: string,
    @Body('imageURL') userImage: string,
    @Body('password') userPassword: string,
  ) {
    const generatedID = this.usersService.insertUser(
      userUsername,
      userBio,
      userImage,
      userPassword,
    );
    return { id: generatedID };
  }

  @Get()
  getAllUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') userID: string) {
    return this.usersService.getSingleUser(userID);
  }

  @Patch(':id')
  updateUser(
    @Param('id') userID: string,
    @Body('username') userUsername: string,
    @Body('bio') userBio: string,
    @Body('imageURL') userImage: string,
    @Body('password') userPassword: string,
  ) {
    this.usersService.updateUser(
      userID,
      userUsername,
      userBio,
      userImage,
      userPassword,
    );
    return null;
  }

  @Delete(':id')
  removeUser(@Param('id') userID: string) {
    this.usersService.deleteUser(userID);
    return null;
  }
}
