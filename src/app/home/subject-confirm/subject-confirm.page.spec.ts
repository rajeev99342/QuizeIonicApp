import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubjectConfirmPage } from './subject-confirm.page';

describe('SubjectConfirmPage', () => {
  let component: SubjectConfirmPage;
  let fixture: ComponentFixture<SubjectConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectConfirmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
