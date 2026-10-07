import { Component, computed, effect, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Customer } from '../customer';
import { CustomerCard } from '../customer-card/customer-card';
import { CustomerStats } from '../customer-stats/customer-stats';
import { SearchBox } from '../../../shared/search-box/search-box';

@Component({
  imports: [CustomerCard, CustomerStats, RouterLink, SearchBox],
  selector: 'app-customer-list',
  styleUrl: './customer-list.css',
  templateUrl: './customer-list.html',
})
export class CustomerList {
  protected readonly customersResource = httpResource<Customer[]>(
    () => 'https://jsonplaceholder.typicode.com/users',
  );

  protected readonly customers = computed(() =>
    this.customersResource.hasValue() ? this.customersResource.value() : [],
  );

  protected readonly query = signal('');
  protected readonly favorites = signal<number[]>([]);
  protected readonly view = signal<'list' | 'cards'>('list');

  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    return this.customers().filter((c) => c.name.toLowerCase().includes(q));
  });

  protected readonly favoriteCount = computed(() => this.favorites().length);

  constructor() {
    const saved = localStorage.getItem('favorites');
    if (saved) this.favorites.set(JSON.parse(saved));

    effect(() => {
      localStorage.setItem('favorites', JSON.stringify(this.favorites()));
    });
  }

  toggleFavorite(id: number) {
    this.favorites.update((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    );
  }
}
