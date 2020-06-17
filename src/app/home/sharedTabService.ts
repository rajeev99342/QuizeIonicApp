import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedTabService {
  private storageObserver: any;


  private parentDataObserver : any;
  public changedValueObserver : any;


  public oneToSecondTabObserver : any;
  public changedOneToSecondTab : any;


  constructor() {

      this.changedValueObserver = Observable.create(observer=>{
        this.parentDataObserver = observer;
      })

      this.changedOneToSecondTab = Observable.create(observer=>{
          this.oneToSecondTabObserver = observer;
      })

  }

  public changeAfterRefreshParent(newValue):void{
    try{
      this.parentDataObserver.next(newValue);

    }catch(e)
    {

    }
  }

  public changeOneToSecond(newValue):void{

    try{
      this.oneToSecondTabObserver.next(newValue);

    }catch(e)
    {

    }

  }

  // public getOneToSecond(newValue):void{
  //     this.oneToSecondTab.next(newValue);
  // }

}
