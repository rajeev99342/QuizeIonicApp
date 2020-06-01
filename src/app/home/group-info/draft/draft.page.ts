import { Component, OnInit, Input } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { SetSelectedGroup } from '../staticData/GroupInfo';
import { NavController, NavParams, PopoverController, ModalController } from '@ionic/angular';
import { GroupModel } from 'src/app/models/GroupModel';
import { TestRoomService } from '../service/testroom.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.page.html',
  styleUrls: ['./draft.page.scss'],
})
export class DraftPage implements OnInit {

  selectedGroup : GroupModel;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private route: ActivatedRoute,
    private storage : Storage,
    private testRoomService:TestRoomService,
    private activateRoute : ActivatedRoute,
    private popoverController: PopoverController, 
    private modalController : ModalController,
    private router : Router,) { 
    this.selectedGroup = navParams.data['group'];
    console.log('Graft',this.selectedGroup)
  }

  ngOnInit() {
    // console.log('GROUP ID IS ',this.groupId)
    console.log('GROUP ID ',SetSelectedGroup.selectedGroup)
  }

  onClickCreateQuiz()
  {

    let createQuizInfoModel : any ={};
    createQuizInfoModel.room = null;
    createQuizInfoModel.selectedGroup = this.selectedGroup;

    let navigationExtras: NavigationExtras = {
      queryParams: {
        groupRoomInfo: JSON.stringify(createQuizInfoModel)
      }
    };
    this.router.navigate(['/create-quiz'],navigationExtras);

  }

}
