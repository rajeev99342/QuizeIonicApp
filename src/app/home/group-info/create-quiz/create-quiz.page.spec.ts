import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateQuizPage } from './create-quiz.page';

describe('CreateQuizPage', () => {
  let component: CreateQuizPage;
  let fixture: ComponentFixture<CreateQuizPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuizPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
