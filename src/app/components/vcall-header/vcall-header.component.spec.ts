import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcallHeaderComponent } from './vcall-header.component';

describe('VcallHeaderComponent', () => {
  let component: VcallHeaderComponent;
  let fixture: ComponentFixture<VcallHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcallHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VcallHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
