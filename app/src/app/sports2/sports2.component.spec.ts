import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sports2Component } from './sports2.component';

describe('Sports2Component', () => {
  let component: Sports2Component;
  let fixture: ComponentFixture<Sports2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sports2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sports2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
