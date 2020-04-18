import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { OptionModel } from './OptionModel';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-options',
  templateUrl: './add-options.page.html',
  styleUrls: ['./add-options.page.scss'],
})
export class AddOptionsPage implements OnInit {
  option : any;
  aOption : any;
  bOption: any;
  cOption : any;
  dOption : any;
  myCorrectOption : any;
  optionObje : OptionModel = new OptionModel();
  constructor(
    private nav : NavParams,  
    public toastController: ToastController,
    private popOverComponennt : PopoverController) { }

  ngOnInit() {
     
        this.optionObje = this.nav.get("obj");

        if(this.optionObje)
        {
            console.log('coming from edit sca', this.nav.get("obj"))
            this.aOption = this.optionObje.aOption;
            this.bOption = this.optionObje.bOption;
            this.cOption = this.optionObje.cOption;
            this.dOption = this.optionObje.dOption;
            this.myCorrectOption = this.optionObje.correctOption
        }


      
  }

  isSameOption()
  {
      
        if(this.option == this.aOption || this.option == this.bOption || this.option == this.cOption || this.option == this.dOption)
        {
            this.presentToast("Options should not be same");

                console.log('ans should not be same')
                return false;
        }else
        {
                return true;
        }
  }

  addOption()
  {
      if(this.option == null)
      {
        this.presentToast("Empty value not allowd");

      }else
      {
        if(this.aOption == null && this.isSameOption())
        {
            this.aOption =this.option;
            this.option = null;
        }else if(this.bOption == null && this.isSameOption())
        {
            this.bOption = this.option;
            this.option = null;
        }else if(this.cOption == null && this.isSameOption())
        {
            this.cOption = this.option;
            this.option = null;
        }else if(this.dOption == null && this.isSameOption())
        {
            this.dOption = this.option;
            this.option = null;
        }
      }

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

edit(option: string)
{
    if(option == "A")
    {
        this.option = this.aOption;
        this.aOption = null;
    }
    if(option == "B")
    {
        this.option = this.bOption;
        this.bOption = null;
    }
    if(option == "C")
    {
        this.option = this.cOption;
        this.cOption = null;
    }
    if(option == "D")
    {
        this.option = this.dOption;
        this.dOption = null;
    }
}

onChangeofOptions(event )
{
    this.myCorrectOption = event;
    console.log('Select correct optoin',event)
}

saveOptions()
{
    if(this.aOption && this.bOption && this.cOption && this.dOption)
    {
      if(this.myCorrectOption == null || this.myCorrectOption == "" || this.myCorrectOption == "NONE")
      {
          this.presentToast("Select correct option");
          console.log('please provide correct option')
      }else
      {

        let optionObj : OptionModel = {
                aOption : this.aOption,
                bOption : this.bOption,
                cOption : this.cOption,
                dOption : this.dOption,
                correctOption : this.myCorrectOption
        }
        console.log('option added successfullyu');
        this.presentToast("Options added successfully");

        this.popOverComponennt.dismiss(optionObj);

      }
        
    }else
    {
        console.log('please provide options')
        this.presentToast("Four options required");

    }
}

isAllOptionFilled()
{
  if(this.aOption && this.bOption && this.cOption && this.dOption)
  {
      return true;
  }else
  {
     return false;
  }
}

async presentToast(ev) {
    const toast = await this.toastController.create({
      message: ev,
      duration: 2000,
      position:'top',
      cssClass:'custom-toast-css-add-option'
    });
    toast.present();
  }

}
