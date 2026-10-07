import { Component, booleanAttribute, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Customer } from '../customer';

@Component({
  imports: [RouterLink],
  selector: 'app-customer-card',
  styleUrl: './customer-card.css',
  templateUrl: './customer-card.html',
})
export class CustomerCard {
  readonly customer = input.required<Customer>();
  readonly favorite = input(false, { transform: booleanAttribute });
  readonly favoriteToggle = output<number>();
}
