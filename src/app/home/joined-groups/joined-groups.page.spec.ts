import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinedGroupsPage } from './joined-groups.page';

describe('JoinedGroupsPage', () => {
  let component: JoinedGroupsPage;
  let fixture: ComponentFixture<JoinedGroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedGroupsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinedGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
