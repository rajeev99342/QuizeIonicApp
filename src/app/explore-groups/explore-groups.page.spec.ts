import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreGroupsPage } from './explore-groups.page';

describe('ExploreGroupsPage', () => {
  let component: ExploreGroupsPage;
  let fixture: ComponentFixture<ExploreGroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreGroupsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
