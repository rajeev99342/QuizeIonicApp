import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LiveTestPage } from './live-test.page';

describe('LiveTestPage', () => {
  let component: LiveTestPage;
  let fixture: ComponentFixture<LiveTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LiveTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
