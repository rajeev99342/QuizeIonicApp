import { Component, OnInit } from '@angular/core';
import { GroupModel } from 'src/app/models/GroupModel';
import { QuizModel } from '../create-quiz/models/QuizModel';
import { AddParticipantPage } from '../add-participant/add-participant.page';
import { ModalController, NavParams } from '@ionic/angular';
import { TestRoomService } from '../service/testroom.service';
import { GroupService } from '../service/group.service';
import { userModel } from '../../user/userModel';
import { ReturnStatement } from '@angular/compiler';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.page.html',
  styleUrls: ['./participant.page.scss'],
})
export class ParticipantPage implements OnInit {
  selectedTab = 0;

  popoverParticipant: any;
  popoverQuizInfo: any;

  addParticipantModel: any;
  participantList: any;
  participants: userModel[] = [];
  selectedGroup: GroupModel;
  popoverParticipantRqstList: any;
  testRoomList: QuizModel[] = [];
  userObject : userModel;
  cities2: any = [];
  constructor(
    private testRoomService: TestRoomService,
    public navParams: NavParams,
    private storage: Storage,
    public groupService: GroupService,
    private modalController: ModalController) {
    this.selectedGroup = navParams.data['group'];

  }

  ngOnInit() {

    this.storage.get('kidder_user').then((userData)=>{
      if(userData)
      {
          this.userObject = userData;
      }
  })

    this.groupService.userByGroupId(this.selectedGroup.grp_id).subscribe((res: userModel[]) => {
      if (res) {
        this.participants = [];
        this.participants = res;

        let adminUser: userModel;
        let index;
        for (let k = 0; k < this.participants.length; k++) {
          if (this.participants[0].admin == true) {
            index = k;
            adminUser = this.participants[k];
            this.participants.splice(k, 1);
            this.participants.splice(0, 0, adminUser);
            break;
          }
        }



        console.log('PARTICIPANT', this.participants)
      }
    })
  }

  filterGroup(ent) {
    this.ngOnInit();
    const searchItem = ent.srcElement.value;
    if (!searchItem) {
      return;
    }
    this.cities2 = this.cities2.filter((val) => {
      if (val.name && searchItem) {
        if (val.name.toLowerCase().indexOf(searchItem.toLowerCase()) > -1) {
          return true;
        } else {
          return false;
        }
      }
    })

  }

  async addParticipant() {



    this.addParticipantModel = await this.modalController.create({
      component: AddParticipantPage,
      animated: true,
      showBackdrop: true,
      cssClass: 'my-custom-add-member-modal-css',
      componentProps: {
        groupInfo: { 'group': this.selectedGroup, 'participant': this.participants }
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
