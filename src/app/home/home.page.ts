import { Component, OnInit } from '@angular/core';
import {SubjectListPage} from './subject-list/subject-list.page';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SubjectConfirmPage } from './subject-confirm/subject-confirm.page';
import { PopoverController } from '@ionic/angular';
import { MesssageServicesService } from './services/messsage-services.service';

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

  
  constructor(public popoverController: PopoverController,
    private messageService : MesssageServicesService,
    public modalController: ModalController,
    private router : Router) { }

  ngOnInit() {
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


  async presentPopover(ev: any) {
    this.popover = await this.popoverController.create({
      component: SubjectConfirmPage,
      event: ev,
      animated:true,
      showBackdrop: true,
     
    });
    return await this.popover.present();
  }

  dismiss()
  {
    
      this.messageService.onFirstComponentButtonClick(this.popover);
  }

}
