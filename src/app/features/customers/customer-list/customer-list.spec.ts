import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerList } from './customer-list';

describe('CustomerList', () => {
  let component: CustomerList;
  let fixture: ComponentFixture<CustomerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerList],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggles a favorite', () => {
    component.toggleFavorite(2);
    expect(component['favorites']()).toEqual([2]);
    component.toggleFavorite(2);
    expect(component['favorites']()).toEqual([]);
  });

  it('filters by name', () => {
    component['query'].set('  ER ');
    expect(component['filtered']().map((c) => c.name)).toEqual(['Ervin Howell']);
  });
});
