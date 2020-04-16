import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {
  abc: any = this.navParams.get('alarmClosureRequest');
  user_name: string;
  baserURL: string = "http://127.0.0.1:9090/RestApi/kidder/main";
  groupForm: FormGroup;
  grp_name: FormControl;
  grp_desc: FormControl;
  constructor(private pop : PopoverController,public navParams: NavParams, private storage: Storage, private http: HttpClient) { }

  ngOnInit() {
    this.storage.get('kidder_user').then((username)=>{
      this.user_name = username;
    });
    this.createGrpFormControls();
    this.createGrpForm();
  }
  createGrpFormControls()
  {
        
    this.grp_name = new FormControl("", [
      Validators.required
    ]);
    this.grp_desc = new FormControl("", [
      Validators.required
    ]);
  }

  createGrpForm()
  {
    this.groupForm = new FormGroup({
      grp_name: this.grp_name,
      grp_desc: this.grp_desc
    });
  }

  async createGroup() {
    this.abc = null;
    const jsonData = JSON.stringify({
      grp_admin: this.user_name,
      grp_name: this.groupForm.value.grp_name,
      grp_desc: this.groupForm.value.grp_desc,
    });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});  
    (this.http.post(this.baserURL+"/saveGroupData",jsonData,{responseType: 'json', headers})).subscribe((result)=>{
    });
    await this.pop.dismiss(true);
  }


}
