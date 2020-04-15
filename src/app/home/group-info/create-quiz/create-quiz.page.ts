import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddImageQuestionPage } from './add-image-question/add-image-question.page';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.page.html',
  styleUrls: ['./create-quiz.page.scss'],
})
export class CreateQuizPage implements OnInit {

  cities2 : any = [];
  selectedFriendsArray : any = [];
  constructor(public modalController: ModalController) {
    
  }

  ngOnInit() {
    this.cities2 = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }

  async addYourOwnQuestioin()
  {
      const modal = await this.modalController.create({
        component: AddImageQuestionPage
      });
      return await modal.present();
    
  }

}
