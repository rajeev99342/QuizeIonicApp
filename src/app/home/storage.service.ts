import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageObserver: any;
  public storage: any;

  private logoutStorageObserver : any;
  public loutoutStorage : any;

  constructor() {
      this.storageObserver= null;

      this.storage= Observable.create(observer => {
          this.storageObserver= observer;
      });

      this.loutoutStorage = Observable.create(observer=>{
        this.logoutStorageObserver = observer;
      })

  }

  public changeAfterLogout(newValue):void{
      this.logoutStorageObserver.next(newValue);
  }

  public changeStorageValue(newValue): void { 
      this.storageObserver.next(newValue);
  }
}
