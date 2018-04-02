import { Injectable } from '@angular/core';

// interfaces
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserService {

  /**
   * 目前登入用戶
   *
   * @type {User}
   * @memberof UserService
   */
  private user: User;

  constructor() { }

  /**
   * 儲存目前用戶
   *
   * @param {User} user
   * @memberof UserService
   */
  setUser(user: User): void {
    this.user = user;
  }

}
