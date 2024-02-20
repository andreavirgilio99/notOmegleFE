import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamsDisplayerComponent } from './cams-displayer.component';

describe('CamsDisplayerComponent', () => {
  let component: CamsDisplayerComponent;
  let fixture: ComponentFixture<CamsDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamsDisplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamsDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
