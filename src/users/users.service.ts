import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { users } from './data';
import { isUser, isID } from './users.validator';

@Injectable()
export class UsersService {
  getUsers(): User[] {
    return users;
  }

  getUserById(id: string): User {
    if (isID(id)) {
      return users.find(user => user.id === parseInt(id, 10));
    }
  }

  createUser(user: User): User {
    if (isUser(user)) {
      const lastUserId = users.length ? users[users.length - 1].id : 0;

      const newUser: User = {
        id: lastUserId + 1,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        mail: user.mail,
      };

      users.push(newUser);

      return newUser;
    }
  }

  updateUser(id: string, user: User): User {
    if (isID(id) && isUser(user)) {
      const userIndex = users.findIndex(item => item.id === parseInt(id, 10));

      if (userIndex !== -1) {
        users[userIndex] = {
          id: users[userIndex].id,
          name: user.name,
          surname: user.surname,
          phone: user.phone,
          mail: user.mail,
        };

        return users[userIndex];
      }
    }
  }

  deleteUser(id: string): User[] {
    if (isID(id)) {
      const userIndex = users.findIndex(item => item.id === parseInt(id, 10));

      if (userIndex !== -1) {
        users.splice(userIndex, 1);

        return users;
      }
    }
  }
}
