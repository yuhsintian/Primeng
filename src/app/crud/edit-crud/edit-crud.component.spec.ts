import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCrudComponent } from './edit-crud.component';

describe('EditCrudComponent', () => {
  let component: EditCrudComponent;
  let fixture: ComponentFixture<EditCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
