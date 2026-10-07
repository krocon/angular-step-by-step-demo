import { ComponentFixture, DeferBlockBehavior, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CustomerList } from './customer-list';

const CUSTOMERS = [
  { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz', company: { name: 'Romaguera-Crona' } },
  { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv', company: { name: 'Deckow-Crist' } },
  { id: 3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net', company: { name: 'Romaguera-Jacobson' } },
];

describe('CustomerList', () => {
  let component: CustomerList;
  let fixture: ComponentFixture<CustomerList>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [CustomerList],
      deferBlockBehavior: DeferBlockBehavior.Manual,
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerList);
    component = fixture.componentInstance;
    TestBed.tick();
    TestBed.inject(HttpTestingController)
      .expectOne('https://jsonplaceholder.typicode.com/users')
      .flush(CUSTOMERS);
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

  it('saves favorites in localStorage', async () => {
    component.toggleFavorite(3);
    await fixture.whenStable();
    expect(localStorage.getItem('favorites')).toBe('[3]');
  });

  it('renders one list item per customer', () => {
    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('li');
    expect(items.length).toBe(3);
  });

  it('filters the list when typing into the search field', async () => {
    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector('input') as HTMLInputElement;
    input.value = 'clem';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(el.querySelectorAll('li').length).toBe(1);
  });

  it('shows the favorite count after clicking a star', async () => {
    const el = fixture.nativeElement as HTMLElement;
    (el.querySelector('li button') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(el.textContent).toContain('⭐ 1 Favoriten');
  });

  it('switches to the card view', async () => {
    const el = fixture.nativeElement as HTMLElement;
    component['view'].set('cards');
    await fixture.whenStable();
    expect(el.querySelectorAll('app-customer-card').length).toBe(3);
  });

  it('shows an error message and retries', async () => {
    const http = TestBed.inject(HttpTestingController);
    const el = fixture.nativeElement as HTMLElement;
    component['customersResource'].reload();
    TestBed.tick();
    http
      .expectOne('https://jsonplaceholder.typicode.com/users')
      .flush('kaputt', { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();
    expect(el.textContent).toContain('Kunden konnten nicht geladen werden.');
  });
});
