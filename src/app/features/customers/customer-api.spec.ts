import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CustomerApi } from './customer-api';

describe('CustomerApi', () => {
  let service: CustomerApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CustomerApi);
    http = TestBed.inject(HttpTestingController);
  });

  it('sends a PATCH with the new name', () => {
    service.rename(3, 'Clementine B.').subscribe();
    const req = http.expectOne('https://jsonplaceholder.typicode.com/users/3');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ name: 'Clementine B.' });
    req.flush({});
  });
});
