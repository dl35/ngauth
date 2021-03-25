import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sports1Component } from './sports1.component';

describe('Sports1Component', () => {
  let component: Sports1Component;
  let fixture: ComponentFixture<Sports1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sports1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sports1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
