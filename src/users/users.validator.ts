import { User } from './user.model';

export function isID(id: string): RegExpMatchArray {
  return id.match(/^[1-9]+\d*$/);
}

export function isUser(user: any): user is User {
  return 'name' in user &&
         'surname' in user &&
         'phone' in user &&
         'mail' in user;
}
