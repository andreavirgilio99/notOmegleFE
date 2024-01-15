import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocallPageComponent } from './videocall-page.component';

describe('VideocallPageComponent', () => {
  let component: VideocallPageComponent;
  let fixture: ComponentFixture<VideocallPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideocallPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideocallPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
