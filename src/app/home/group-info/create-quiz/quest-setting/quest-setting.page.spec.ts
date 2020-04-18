import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestSettingPage } from './quest-setting.page';

describe('QuestSettingPage', () => {
  let component: QuestSettingPage;
  let fixture: ComponentFixture<QuestSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestSettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
