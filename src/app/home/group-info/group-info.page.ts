import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantPage } from './participant/participant.page';
import { PopoverController } from '@ionic/angular';
import { QuizeInfoPage } from './quize-info/quize-info.page';
import { AddParticipantPage } from './add-participant/add-participant.page';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.page.html',
  styleUrls: ['./group-info.page.scss'],
})
export class GroupInfoPage implements OnInit {

  popoverParticipant : any;
  popoverQuizInfo : any;

  popoverAddParticipant : any;
  cities2 : any = [];
  constructor(private popoverController: PopoverController, private router : Router) { }

  ngOnInit() {
        this.cities2 = [
          {name: 'New York', code: 'NY'},
          {name: 'Rome', code: 'RM'},
          {name: 'London', code: 'LDN'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'}
        ];
    }



      async onClickParticipantQuizeWise(ev: any) {
        
        this.popoverParticipant = await this.popoverController.create({
          component: ParticipantPage,
          animated:true,
          showBackdrop: true,
          
         
        });
        this.popoverParticipant.onDidDismiss().then(dataReturned => {
          if (dataReturned.data) {
              // console.log('Register successfully');
              // this.authenticated= true;
              // this.storageService.changeStorageValue(dataReturned.data);
              
            } else {
              console.log('Register failure');
          }
        });
        return await this.popoverParticipant.present();
      }
    

   async onClickQuizeInfo(ev)
    {
      
      this.popoverQuizInfo = await this.popoverController.create({
        component: QuizeInfoPage,
        animated:true,
        showBackdrop: true,
        
       
      });
      this.popoverQuizInfo.onDidDismiss().then(dataReturned => {
        if (dataReturned.data) {
            // console.log('Register successfully');
            // this.authenticated= true;
            // this.storageService.changeStorageValue(dataReturned.data);
            
          } else {
            console.log('Register failure');
        }
      });
      return await this.popoverQuizInfo.present();

    }

    onClickCreateQuiz()
    {
      this.router.navigate(['/create-quiz']);

    }

   async addParticipantInThisGroup()
    {
      
            
      this.popoverAddParticipant = await this.popoverController.create({
        component: AddParticipantPage,
        animated:true,
        showBackdrop: true,
        
       
      });
      this.popoverAddParticipant.onDidDismiss().then(dataReturned => {
        if (dataReturned.data) {
            // console.log('Register successfully');
            // this.authenticated= true;
            // this.storageService.changeStorageValue(dataReturned.data);
            
          } else {
            console.log('Register failure');
        }
      });
      return await this.popoverAddParticipant.present();
    }

}
