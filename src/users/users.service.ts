import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(
    username: string,
    bio: string,
    imageURL: string,
    password: string,
  ) {
    const newUser = new this.userModel({ username, bio, imageURL, password });
    const result = await newUser.save();
    return result.id as string;
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('User could not be found!');
    }
    return user;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      bio: user.bio,
      imageURL: user.imageURL,
      password: user.password,
    }));
  }

  async getSingleUser(userID: string) {
    const user = await this.findUser(userID);
    return {
      id: user.id,
      username: user.username,
      bio: user.bio,
      imageURL: user.imageURL,
      password: user.password,
    };
  }

  async updateUser(
    userID: string,
    username: string,
    bio: string,
    imageURL: string,
    password: string,
  ) {
    const updatedUser = await this.findUser(userID);
    if (username) {
      updatedUser.username = username;
    }
    if (bio) {
      updatedUser.bio = bio;
    }
    if (imageURL) {
      updatedUser.imageURL = imageURL;
    }
    if (password) {
      updatedUser.password = password;
    }
    updatedUser.save();
  }

  async deleteUser(userID: string) {
    const result = await this.userModel.deleteOne({ _id: userID }).exec();
    if (result.deletedCount !== 1) {
      throw new NotFoundException('User was not found');
    }
  }
}
