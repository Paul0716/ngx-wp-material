import { Injectable } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';


/**
 * ˇ資料儲存方法
 *
 * @export
 * @enum {number}
 */
export enum StorageType {

  Local,

  Session,
}

@Injectable()
export class StorageService {

  constructor(
    private sessionStorage: SessionStorageService,
    private localStorage: LocalStorageService,
  ) { }


  /**
   * 儲存資料
   *
   * @param {string} key - 資料的Key值
   * @param {*} data - 要儲存的資料
   * @param {number} type - 要儲存的類型
   * @memberof StorageService
   */
  store(key: string, data: any, type: number): void {

    switch (type) {

      case StorageType.Local:
        this.localStorage.store(key, data);
        break;

      case StorageType.Session:
        this.sessionStorage.store(key, data);
        break;

    }

  }

  /**
   * 取得儲存的資料
   *
   * @param {string} key - 資料的Key值
   * @param {number} type - 要從哪裡取得儲存的資料
   * @returns {any}
   * @memberof StorageService
   */
  getData(key: string, type: number): any {

    switch (type) {

      case StorageType.Local:
        return this.localStorage.retrieve(key);

      case StorageType.Session:
        return this.sessionStorage.retrieve(key);

    }

  }

  /**
   * 清除已儲存的資料
   *
   * @param {number} type - 要清除的空間
   * @param {string} [key] - 如果要清除某個特定的資料時才傳入
   * @memberof StorageService
   */
  clean(type: number, key?: string): void {

    switch (type) {

      case StorageType.Local:
        this.localStorage.clear(key);
        break;

      case StorageType.Session:
        this.sessionStorage.clear(key);
        break;

    }

  }


}
