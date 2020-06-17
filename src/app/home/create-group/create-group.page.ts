import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupModel } from 'src/app/models/GroupModel';
import { AppService } from 'src/app/services/app.service';
import { GroupService } from '../group-info/service/group.service';
import { userModel } from '../user/userModel';
@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {
  abc: any = this.navParams.get('alarmClosureRequest');
  username: string;
  userObject: userModel;
  groupForm: FormGroup;
  grp_name: FormControl;
  grp_desc: FormControl;
  examList: any[] = [];
  validGrpFlg: boolean = false;
  eror_message: string;
  selectedExamList: any[] = [];
  constructor(
    private groupService: GroupService,
    private appService: AppService,
    private pop: PopoverController,
    private modalCtrl: ModalController,

    public navParams: NavParams,
    private storage: Storage,
    private http: HttpClient) { }

  ngOnInit() {
    this.storage.get('kidder_user').then((username) => {
      this.userObject = username;
    });

    this.examList.push(
      { "name": "SSC", "code": "SCC" },
      { "name": "SSC", "code": "SCC" },
      { "name": "SSC", "code": "SCC" },
      { "name": "SSC", "code": "SCC" },
      { "name": "SSC", "code": "SCC" },
      { "name": "SSC", "code": "SCC" },

    )

    this.createGrpFormControls();
    this.createGrpForm();
  }
  createGrpFormControls() {

    this.grp_name = new FormControl("", [
      Validators.required
    ]);
    this.grp_desc = new FormControl("", [
      Validators.required
    ]);
  }

  createGrpForm() {
    this.groupForm = new FormGroup({
      grp_name: this.grp_name,
      grp_desc: this.grp_desc
    });
  }

  async createGroup() {
    this.abc = null;

    let groupModel: GroupModel = new GroupModel();

    groupModel.grp_name = this.groupForm.value.grp_name;
    groupModel.grp_desc = this.groupForm.value.grp_desc;
    groupModel.grp_admin = this.userObject.user_username;

    let created: boolean = false;

    this.groupService.saveGroupInfo(groupModel).subscribe((response) => {
      this.eror_message = null;
      this.validGrpFlg = false;
      if (response.body["status"] == "Success") {
        console.log('group created by ')
        created = true;
      } else {
        this.validGrpFlg = true;
        this.eror_message = "Group name already exist."
        console.log(response)
      }

    })

    if (created) {
      await this.modalCtrl.dismiss(groupModel);

    } else {
      await this.modalCtrl.dismiss(false);

    }
  }


  close()
  {
    this.modalCtrl.dismiss();
  }

}
