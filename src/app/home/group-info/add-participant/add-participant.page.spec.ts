import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddParticipantPage } from './add-participant.page';

describe('AddParticipantPage', () => {
  let component: AddParticipantPage;
  let fixture: ComponentFixture<AddParticipantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParticipantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddParticipantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
