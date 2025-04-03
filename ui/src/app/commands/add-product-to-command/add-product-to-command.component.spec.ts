import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductToCommandComponent } from './add-product-to-command.component';

describe('AddProductToCommandComponent', () => {
  let component: AddProductToCommandComponent;
  let fixture: ComponentFixture<AddProductToCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductToCommandComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProductToCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
