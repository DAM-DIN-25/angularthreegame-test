import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceFace } from './dice-face';

describe('DiceFace', () => {
  let component: DiceFace;
  let fixture: ComponentFixture<DiceFace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceFace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceFace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
