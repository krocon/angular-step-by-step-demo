import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'customers' },
  {
    path: 'customers',
    loadComponent: () =>
      import('./features/customers/customer-list/customer-list').then((m) => m.CustomerList),
  },
  {
    path: 'customers/:id',
    loadComponent: () =>
      import('./features/customers/customer-detail/customer-detail').then(
        (m) => m.CustomerDetail,
      ),
  },
  { path: '**', redirectTo: 'customers' },
];
