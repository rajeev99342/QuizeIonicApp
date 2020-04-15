import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizeInfoPage } from './quize-info.page';

describe('QuizeInfoPage', () => {
  let component: QuizeInfoPage;
  let fixture: ComponentFixture<QuizeInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizeInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizeInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
