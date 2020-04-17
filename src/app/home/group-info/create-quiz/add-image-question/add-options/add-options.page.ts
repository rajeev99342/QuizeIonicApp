import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-add-options',
  templateUrl: './add-options.page.html',
  styleUrls: ['./add-options.page.scss'],
})
export class AddOptionsPage implements OnInit {
  option : any;
  constructor(private popOverComponennt : PopoverController) { }

  ngOnInit() {
  }

ok()
{
    this.popOverComponennt.dismiss(this.option);
}
  
cancel()
{
    this.option = null;
    this.popOverComponennt.dismiss(this.option)
}

}
