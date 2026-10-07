import { Component, computed, effect, signal } from '@angular/core';
import { Customer } from '../customer';
import { CustomerCard } from '../customer-card/customer-card';
import { CustomerStats } from '../customer-stats/customer-stats';

@Component({
  imports: [CustomerCard, CustomerStats],
  selector: 'app-customer-list',
  styleUrl: './customer-list.css',
  templateUrl: './customer-list.html',
})
export class CustomerList {
  protected readonly customers = signal<Customer[]>([
    { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz', company: { name: 'Romaguera-Crona' } },
    { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv', company: { name: 'Deckow-Crist' } },
    { id: 3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net', company: { name: 'Romaguera-Jacobson' } },
  ]);

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
