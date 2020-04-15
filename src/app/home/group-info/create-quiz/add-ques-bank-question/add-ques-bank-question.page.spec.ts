import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddQuesBankQuestionPage } from './add-ques-bank-question.page';

describe('AddQuesBankQuestionPage', () => {
  let component: AddQuesBankQuestionPage;
  let fixture: ComponentFixture<AddQuesBankQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuesBankQuestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddQuesBankQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
