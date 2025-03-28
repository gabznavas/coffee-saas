import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningTableFormComponent } from './dining-table-form.component';

describe('DiningTableFormComponent', () => {
  let component: DiningTableFormComponent;
  let fixture: ComponentFixture<DiningTableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiningTableFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiningTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
