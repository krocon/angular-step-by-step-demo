import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { apiInterceptor } from './api-interceptor';

describe('apiInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([apiInterceptor])), provideHttpClientTesting()],
    });
  });

  it('adds the X-App header', () => {
    TestBed.inject(HttpClient).get('/test').subscribe();
    const req = TestBed.inject(HttpTestingController).expectOne('/test');
    expect(req.request.headers.get('X-App')).toBe('kundenportal');
    req.flush({});
  });
});
