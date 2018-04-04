import { Injectable } from '@angular/core';

// interfaces
import { User } from '../interfaces/user.interface';
import { StorageService, StorageType } from '../core/storage/storage.service';
import { storageKeys } from '../const/storage-keys';

@Injectable()
export class UserService {

  /**
   * 目前登入用戶
   *
   * @type {User}
   * @memberof UserService
   */
  private user: User;

  constructor(
    private storage: StorageService,
  ) {
    this.reloadData();
  }

  /**
   * 取得目前用戶資料
   *
   * @returns {User}
   * @memberof UserService
   */
  getUser() {
    return this.user;
  }

  /**
   * 儲存目前用戶
   *
   * @param {User} user
   * @memberof UserService
   */
  setUser(user: User): void {
    this.user = user;
  }

  /**
   * 從儲存空間裡取出使用者的資料
   *
   * @memberof UserService
   */
  reloadData(): void {
    const data = this.storage.getData(storageKeys.user, StorageType.Session);
    this.setUser(data);
  }

}
