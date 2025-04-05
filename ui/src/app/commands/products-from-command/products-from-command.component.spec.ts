import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFromCommandComponent } from './products-from-command.component';

describe('AddProductToCommandComponent', () => {
  let component: ProductsFromCommandComponent;
  let fixture: ComponentFixture<ProductsFromCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsFromCommandComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsFromCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
