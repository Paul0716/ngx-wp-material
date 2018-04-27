import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CofirmComponent } from './cofirm.component';

describe('CofirmComponent', () => {
  let component: CofirmComponent;
  let fixture: ComponentFixture<CofirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CofirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
