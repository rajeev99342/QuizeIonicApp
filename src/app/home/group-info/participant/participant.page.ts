import { Component, OnInit } from '@angular/core';
import { GroupModel } from 'src/app/models/GroupModel';
import { QuizModel } from '../create-quiz/models/QuizModel';
import { AddParticipantPage } from '../add-participant/add-participant.page';
import { ModalController } from '@ionic/angular';
import { TestRoomService } from '../service/testroom.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.page.html',
  styleUrls: ['./participant.page.scss'],
})
export class ParticipantPage implements OnInit {
  selectedTab = 0;

  popoverParticipant : any;
  popoverQuizInfo : any;

  addParticipantModel : any;
  participantList : any;
  selectedGroup : GroupModel;
  popoverParticipantRqstList : any;
  testRoomList : QuizModel[] = [];
  cities2 : any = [];
  constructor(
    private testRoomService:TestRoomService ,
     private modalController : ModalController) { }

  ngOnInit() {
    this.cities2 = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ];
  }

  filterGroup(ent)
  {
      this.ngOnInit();
      const searchItem = ent.srcElement.value;
      if(!searchItem)
      {
          return;
      }
      this.cities2 = this.cities2.filter((val)=>{
          if(val.name && searchItem)
          {
              if(val.name.toLowerCase().indexOf(searchItem.toLowerCase()) > -1)
              {
                  return true;
              }else{
                return false;
              }
          }
      })

  }

  async addParticipant()
  {
    
    
          
    this.addParticipantModel = await this.modalController.create({
      component: AddParticipantPage,
      animated:true,
      showBackdrop: true,
      cssClass: 'my-custom-add-member-modal-css',
      componentProps:{
        groupInfo : this.selectedGroup
    }
     
    });
    this.addParticipantModel.onDidDismiss().then(dataReturned => {
      if (dataReturned.data) {
     
        } else {
          console.log('add group member');
      }
    });
    return await this.addParticipantModel.present();
  }

}
