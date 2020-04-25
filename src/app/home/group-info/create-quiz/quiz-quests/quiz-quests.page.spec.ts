import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizQuestsPage } from './quiz-quests.page';

describe('QuizQuestsPage', () => {
  let component: QuizQuestsPage;
  let fixture: ComponentFixture<QuizQuestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizQuestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizQuestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
