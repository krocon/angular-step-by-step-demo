import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer';

@Service()
export class CustomerApi {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://jsonplaceholder.typicode.com/users';

  rename(id: number, name: string) {
    return this.http.patch<Customer>(`${this.url}/${id}`, { name });
  }
}
