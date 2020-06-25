import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userModel } from '../user/userModel';
import { QuizModel } from '../group-info/create-quiz/models/QuizModel';
import { GroupParticipantModel } from '../group-info/add-participant/groupPartiModet';
import { GroupModel } from 'src/app/models/GroupModel';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }


  addParticipantNotification(user: userModel,group : GroupModel) {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "key=AAAAB-3pwko:APA91bE1EE9D5wDr4zQzD7mU7NwpKRtphHb-DqDs7LOI7K66jTBCdQ7He44OFBqXfbsyLEIHcCyCeTjgX8z7f-bKvWzncf7raFIhgRyUbU_9HhCEdSYOFvsV56AmnLKrc6iM0nnlIZuH"
    });
    let options = { headers: headers };

    let user_token = user.user_token;
    let notification = {

      "notification": {
        "title": "Congratulation !!!",
        "body": "Hi"+ user.user_name+"," +"you are added to the"+group.grp_name+"."+ "I hope you will enhance yourself in this house",
        "sound": "default",
        "click_action": "FCM_PLUGIN_ACTIVITY",
        "icon": "fcm_push_icon"
      },
      "data": {
        "landing_page": "notifications",
        "price": "$3,000.00"
      },
      "to": user_token,

      "restricted_package_name": ""
    }


    return this.http.post("https://fcm.googleapis.com/fcm/send", notification, options);

  }


  sendNotificationToHouse(tokens, quiz:QuizModel,group:GroupModel) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "key=AAAAB-3pwko:APA91bE1EE9D5wDr4zQzD7mU7NwpKRtphHb-DqDs7LOI7K66jTBCdQ7He44OFBqXfbsyLEIHcCyCeTjgX8z7f-bKvWzncf7raFIhgRyUbU_9HhCEdSYOFvsV56AmnLKrc6iM0nnlIZuH",


    });

    let notification = {
      "notification": {
        "title": "Test Started",
        "body":  "Hi" + quiz.userModel.user_name+","+"you test has been stared in house"+group.grp_name+"."+"Click on the notification to give the test",
        "click_action": "http://localhost:3000/",
        "icon": "http://localhost:3000/icon.png"
      },
      "data": {
        "landing_page": "live-test",
        "quizId": quiz.quizId
      },
      "registration_ids":  [],
      "restricted_package_name":""
    }


    let options = { headers: headers };

    tokens.forEach(element => {
      notification.registration_ids.push(element)
    });

    let json = JSON.stringify(tokens)
    let url = "https://fcm.googleapis.com/fcm/send";

    return this.http.post(url,notification, options);

  
}

  sendStartTestNotification(tokens) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "key=AAAAB-3pwko:APA91bE1EE9D5wDr4zQzD7mU7NwpKRtphHb-DqDs7LOI7K66jTBCdQ7He44OFBqXfbsyLEIHcCyCeTjgX8z7f-bKvWzncf7raFIhgRyUbU_9HhCEdSYOFvsV56AmnLKrc6iM0nnlIZuH"
    });
    let options = { headers: headers };

    let notification = {

      "notification": {
        "title": "Ionic 4 Notification",
        "body": "This notification sent from POSTMAN using Firebase HTTP protocol",
        "sound": "default",
        "click_action": "FCM_PLUGIN_ACTIVITY",
        "icon": "fcm_push_icon"
      },
      "data": {
        "landing_page": "notifications",
        "price": "$3,000.00"
      },
      "to": tokens,

      "restricted_package_name": ""
    }


    return this.http.post("https://fcm.googleapis.com/fcm/send", notification, options);

  }


}
