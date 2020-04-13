import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubjectListPage } from './subject-list.page';

describe('SubjectListPage', () => {
  let component: SubjectListPage;
  let fixture: ComponentFixture<SubjectListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
