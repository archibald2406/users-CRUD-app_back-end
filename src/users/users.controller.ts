import { Controller, Get, Res, HttpStatus, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Res() res: Response) {
    const users: User[] = this.usersService.getUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  getUserById(@Res() res: Response, @Param('id') id: string) {
    const user: User = this.usersService.getUserById(id);

    if (user) {
      return res.status(HttpStatus.OK).json(user);
    }

    res.writeHead(404, 'Record not found');
    res.send();
  }

  @Post()
  createUser(@Body() body: User, @Res() res: Response) {
    const newUser: User = this.usersService.createUser(body);

    if (newUser) {
      return res.status(HttpStatus.OK).json(newUser);
    }

    res.writeHead(500, 'Invalid data in request');
    res.send();
  }

  @Put(':id')
  updateUser(@Body() body: User, @Res() res: Response, @Param('id') id: string) {
    const newUser = this.usersService.updateUser(id, body);

    if (newUser) {
      return res.status(HttpStatus.OK).json(newUser);
    }

    res.writeHead(500, 'Invalid data in request or user with such id does not exist');
    res.send();
  }

  @Delete(':id')
  deleteUser(@Res() res: Response, @Param('id') id: string) {
    const users: User[] = this.usersService.deleteUser(id);

    if (users) {
      return res.status(HttpStatus.OK).json(users);
    }

    res.writeHead(404, 'Record not found');
    res.send();
  }
}
