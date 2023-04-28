import { CrudComponent } from './crud.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('CrudComponent', () => {
  let component: CrudComponent;
  let fixture: ComponentFixture<CrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
