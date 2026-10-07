import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CustomerDetail } from './customer-detail';

const URL = 'https://jsonplaceholder.typicode.com/users/3';
const CLEMENTINE = {
  id: 3,
  name: 'Clementine Bauch',
  email: 'Nathan@yesenia.net',
  company: { name: 'Romaguera-Jacobson' },
};

describe('CustomerDetail', () => {
  let fixture: ComponentFixture<CustomerDetail>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetail],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDetail);
    http = TestBed.inject(HttpTestingController);
    fixture.componentRef.setInput('id', '3');
    TestBed.tick();
    http.expectOne(URL).flush(CLEMENTINE);
    await fixture.whenStable();
  });

  it('loads the customer for the id', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('h2')?.textContent).toContain(
      'Clementine Bauch',
    );
  });

  it('shows the new name after renaming', async () => {
    fixture.componentInstance.rename('Clementine B.');
    http.expectOne(URL).flush({ id: 3, name: 'Clementine B.' });
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('h2')?.textContent).toContain(
      'Clementine B.',
    );
  });
});
