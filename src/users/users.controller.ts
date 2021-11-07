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
  async addUser(
    @Body('username') userUsername: string,
    @Body('bio') userBio: string,
    @Body('imageURL') userImage: string,
    @Body('password') userPassword: string,
  ) {
    const generatedID = await this.usersService.insertUser(
      userUsername,
      userBio,
      userImage,
      userPassword,
    );
    return { id: generatedID };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') userID: string) {
    return this.usersService.getSingleUser(userID);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userID: string,
    @Body('username') userUsername: string,
    @Body('bio') userBio: string,
    @Body('imageURL') userImage: string,
    @Body('password') userPassword: string,
  ) {
    await this.usersService.updateUser(
      userID,
      userUsername,
      userBio,
      userImage,
      userPassword,
    );
    return null;
  }

  @Delete(':id')
  async removeUser(@Param('id') userID: string) {
    await this.usersService.deleteUser(userID);
    return null;
  }
}
