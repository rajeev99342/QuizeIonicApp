import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageObserver: any;
  public storage: any;

  constructor() {
      this.storageObserver= null;

      this.storage= Observable.create(observer => {
          this.storageObserver= observer;
      });
  }

  public changeStorageValue(newValue): void { 

      // This method changes the value of the storage
      // ...

      // Notify to the subscriptor that the value has changed
      this.storageObserver.next(newValue);
  }
}
