import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantPage } from './participant/participant.page';
import { PopoverController } from '@ionic/angular';
import { QuizeInfoPage } from './quize-info/quize-info.page';
import { AddParticipantPage } from './add-participant/add-participant.page';
import { ParticipantRequestListPage } from './participant-request-list/participant-request-list.page';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.page.html',
  styleUrls: ['./group-info.page.scss'],
})
export class GroupInfoPage implements OnInit {

  popoverParticipant : any;
  popoverQuizInfo : any;

  popoverAddParticipant : any;
  participantList : any;

  popoverParticipantRqstList : any;
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
        
        this.participantList = await this.popoverController.create({
          component: ParticipantPage,
          animated:true,
          showBackdrop: true,
          
         
        });
        this.participantList.onDidDismiss().then(dataReturned => {
          if (dataReturned.data) {
              console.log('Register successfully');
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


    async addParticipant()
    {
      
      
            
      this.popoverAddParticipant = await this.popoverController.create({
        component: AddParticipantPage,
        animated:true,
        showBackdrop: true,
        
       
      });
      this.popoverAddParticipant.onDidDismiss().then(dataReturned => {
        if (dataReturned.data) {
       
          } else {
            console.log('Register failure');
        }
      });
      return await this.popoverAddParticipant.present();
    }

   async participantInThisGroup()
    {
      
            
      this.popoverAddParticipant = await this.popoverController.create({
        component: ParticipantPage,
        animated:true,
        showBackdrop: true,
        
       
      });
      this.popoverAddParticipant.onDidDismiss().then(dataReturned => {
        if (dataReturned.data) {
       
          } else {
            console.log('Register failure');
        }
      });
      return await this.popoverAddParticipant.present();
    }

   async onClickParticipantRequestList()
    {
            
            
      this.popoverParticipantRqstList = await this.popoverController.create({
        component: ParticipantRequestListPage,
        animated:true,
        showBackdrop: true,
        
       
      });
      this.popoverParticipantRqstList.onDidDismiss().then(dataReturned => {
        if (dataReturned.data) {
        
          } else {
            console.log('Register failure');
        }
      });
      return await this.popoverParticipantRqstList.present();
    }


    doRefresh(event)
    {
        console.log('Begin async operation');
  
            setTimeout(() => {
              console.log('Async operation has ended');
              event.target.complete();
            }, 200);
    }

}
