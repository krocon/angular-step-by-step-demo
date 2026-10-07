import { Component, inject, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Customer } from '../customer';
import { CustomerApi } from '../customer-api';

@Component({
  imports: [],
  selector: 'app-customer-detail',
  styleUrl: './customer-detail.css',
  templateUrl: './customer-detail.html',
})
export class CustomerDetail {
  private readonly api = inject(CustomerApi);

  readonly id = input.required<string>();

  protected readonly customer = httpResource<Customer>(
    () => `https://jsonplaceholder.typicode.com/users/${this.id()}`,
  );

  rename(name: string) {
    this.api
      .rename(Number(this.id()), name)
      .subscribe((updated) => this.customer.update((c) => c && { ...c, ...updated }));
  }
}
