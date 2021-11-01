import { Injectable, NotFoundException } from '@nestjs/common';
import { stringify } from 'querystring';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  private findUser(id: string): [User, number] {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];
    if (!user) {
      throw new NotFoundException('User could not be found!');
    }
    return [user, userIndex];
  }

  insertUser(
    username: string,
    bio: string,
    imageURL: string,
    password: string,
  ) {
    const userID = Math.random().toString();
    const newUser = new User(userID, username, bio, imageURL, password);
    this.users.push(newUser);
    return userID;
  }

  getUsers() {
    return [...this.users];
  }

  getSingleUser(userID: string) {
    const user = this.findUser(userID)[0];
    return { ...user };
  }

  updateUser(
    userID: string,
    username: string,
    bio: string,
    imageURL: string,
    password: string,
  ) {
    const [user, index] = this.findUser(userID);
    const updatedUser = { ...user };
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
    this.users[index] = updatedUser;
  }

  deleteUser(userID: string) {
    const index = this.findUser(userID)[1];
    this.users.splice(index, 1);
  }
}
