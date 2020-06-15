import { Injectable ,EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';    
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }    
    

  addParticipantNotification(token:any)
  {
   

    let user_token = token;
   let notification =  {
      "notification":{
        "title":"Ionic 4 Notification",
        "body":"This notification sent from POSTMAN using Firebase HTTP protocol",
        "sound":"default",
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"fcm_push_icon"
      },
      "data":{
        "landing_page":"notifications",
        "price":"$3,000.00"
      },
        "to":user_token,
        "priority":"high",
        "restricted_package_name":""
    }

    return this.http.post("",notification,{observe:'response'});

  }

  

}
