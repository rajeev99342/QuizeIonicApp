import { Component, OnInit } from '@angular/core';
import {SubjectListPage} from './subject-list/subject-list.page';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SubjectConfirmPage } from './subject-confirm/subject-confirm.page';
import { PopoverController } from '@ionic/angular';
import { MesssageServicesService } from './services/messsage-services.service';
import { SignUpPage } from './sign-up/sign-up.page';
import { CreateGroupPage } from './create-group/create-group.page';
import { UserInfo } from './constants/userInfo';
import { Storage } from '@ionic/storage';
import { HomeApiServiceService } from './services/home-api-service.service';
import { StorageService } from './storage.service';
import { AppService } from '../app.service';

interface City {
  name: string;
  code: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  cities2: City[];
  selectedCity2: City;
  selectedValue : any;
  subjectListPage : SubjectListPage;
   popover : any;
   popoverForCreateGroup: any;
   authenticated : boolean = false;
   groupCreatedByYou : boolean = false;
  
  constructor(public popoverController: PopoverController,
    private messageService : MesssageServicesService,
    private homeApiServiceService :HomeApiServiceService,
    public modalController: ModalController,
    private router : Router,
    private appService :AppService,
    private storageService:StorageService,
    private storage : Storage
    ) { }

  ngOnInit() {


    console.log('TTHIS IS BASE URL',this.appService.getBaseURL())
    
    this.appService.getBaseURL().subscribe((url)=>{
        console.log('TTHIS IS BASE URL',url["baserURL"])
    })
    this.homeApiServiceService.getApi().subscribe((data)=>{
      console.log('getting data from api',data);
    })

    this.storage.get('kidder_user').then((username)=>{
        if(username)
        {
            this.authenticated = true;
        }
    })

    this.cities2 = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }

  onChangeClass(event)
  {
      console.log('selected class is',this.selectedValue)
  }

  // onClickNext()
  // {
  //     console.log('hi this is next');
  //     // this.navCtrl.push(SubjectListPage);
  // }
    
  onClickSubject(event)
  {

    

    console.log('go to subject list');
    this.router.navigate(['/topic']);

  }


  async OpenSignUpPopUP(ev: any) {
    this.popover = await this.popoverController.create({
      component: SignUpPage,
      event: ev,
      animated:true,
      showBackdrop: true,
     
    });
    this.popover.onDidDismiss().then(dataReturned => {
      if (dataReturned.data) {
          console.log('Register successfully');
          this.authenticated= true;
          this.storageService.changeStorageValue(dataReturned.data);
          
        } else {
          console.log('Register failure');
      }
    });
    return await this.popover.present();
  }

  dismiss()
  {
    
      this.messageService.onFirstComponentButtonClick(this.popover);
  }

  async createGroup(ev: any)
  {
    this.cities2 = [];
    this.popoverForCreateGroup = await this.popoverController.create({
      component: CreateGroupPage,
     
      event: ev,
      animated:true,
      showBackdrop: true,
     
    });
    this.popoverForCreateGroup.onDidDismiss().then(dataReturned => {
      if (dataReturned.data ==true) {
          this.groupCreatedByYou = true;
          this.cities2.push({name: 'New York', code: 'NY'})
        } else {
          console.log('Data return 2');
      }
    });
    return await this.popoverForCreateGroup.present();
  }

}
