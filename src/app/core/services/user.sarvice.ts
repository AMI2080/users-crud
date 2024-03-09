import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'ahmed',
      email: 'a@test.com',
      phone: '4353453543',
      status: 'active',
    },
    {
      id: 2,
      name: 'omar',
      email: 'a@test.com',
      phone: '372636722',
      status: 'active',
    },
    {
      id: 3,
      name: 'ali',
      email: 'c@test.com',
      phone: '82736',
      status: 'soft_deleted',
    },
  ];

  public get(): Observable<User[]> {
    return new Observable((observer) => {
      observer.next(this.users);
    });
  }

  public delete(userId: number): Observable<boolean> {
    return new Observable((observer) => {
      const user: User = this.users.find(
        (user) => user.id === userId && user.status === 'active'
      );
      if (user) {
        user.status = 'soft_deleted';
        observer.next(true);
      } else {
        observer.next(false);
      }
    });
  }

  public forceDelete(userId: number): Observable<boolean> {
    return new Observable((observer) => {
      const userIndex: number = this.users.findIndex(
        (user) => user.id === userId && user.status === 'soft_deleted'
      );
      if (userIndex >= 0) {
        this.users.splice(userIndex, 1);
        observer.next(true);
      } else {
        observer.next(false);
      }
    });
  }

  public restore(userId: number): Observable<boolean> {
    return new Observable((observer) => {
      const user: User = this.users.find(
        (user) => user.id === userId && user.status === 'soft_deleted'
      );
      if (user) {
        user.status = 'active';
        observer.next(true);
      } else {
        observer.next(false);
      }
    });
  }

  public create(updatedUser: User): Observable<boolean> {
    return new Observable((observer) => {
      const maxId = this.users.reduce(
        (maxId, user) => (maxId = maxId > user.id ? maxId : user.id),
        0
      );
      this.users.push({ ...updatedUser, id: maxId + 1, status: 'active' });
      observer.next(true);
    });
  }

  public update(updatedUser: User): Observable<boolean> {
    return new Observable((observer) => {
      const userIndex: number = this.users.findIndex(
        (user) => user.id === updatedUser.id
      );
      if (userIndex >= 0) {
        this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
        observer.next(true);
      } else {
        observer.next(false);
      }
    });
  }
}
