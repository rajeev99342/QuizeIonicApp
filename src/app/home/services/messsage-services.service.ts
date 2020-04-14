import { Injectable ,EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';    

@Injectable({
  providedIn: 'root'
})
export class MesssageServicesService {


  invokeFirstComponentFunction = new EventEmitter();    
  subsVar: Subscription;    
    
  constructor() { }    
    
  onFirstComponentButtonClick(op) {    
    // this.invokeFirstComponentFunction.emit();   
    op.dismiss(); 
  }    


}
