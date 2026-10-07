import { Component, signal } from '@angular/core';
import { Customer } from '../customer';

@Component({
  imports: [],
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

  toggleFavorite(id: number) {
    this.favorites.update((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id],
    );
  }
}
