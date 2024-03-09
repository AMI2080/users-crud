import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      name: 'ahmed',
      id: 1,
      email: 'a@test.com',
      phone: '4353453543',
      status: 'active',
    },
    {
      name: 'omar',
      id: 2,
      email: 'a@test.com',
      phone: '372636722',
      status: 'active',
    },
    {
      name: 'ali',
      id: 3,
      email: 'c@test.com',
      phone: '82736',
      status: 'soft_deleted',
    },
  ];

  public get(): Observable<User[]> {
    return of(this.users);
  }
}
