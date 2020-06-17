import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }


  addParticipantNotification(token: any) {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "key=AAAAB-3pwko:APA91bE1EE9D5wDr4zQzD7mU7NwpKRtphHb-DqDs7LOI7K66jTBCdQ7He44OFBqXfbsyLEIHcCyCeTjgX8z7f-bKvWzncf7raFIhgRyUbU_9HhCEdSYOFvsV56AmnLKrc6iM0nnlIZuH"
    });
    let options = { headers: headers };

    let user_token = token;
    let notification = {
      
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
         
          "restricted_package_name":""
      }
    

    return this.http.post("https://fcm.googleapis.com/fcm/send", notification,options);

  }



}
