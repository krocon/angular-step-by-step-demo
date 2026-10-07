import { Component, booleanAttribute, input } from '@angular/core';
import { Customer } from '../customer';

@Component({
  imports: [],
  selector: 'app-customer-card',
  styleUrl: './customer-card.css',
  templateUrl: './customer-card.html',
})
export class CustomerCard {
  readonly customer = input.required<Customer>();
  readonly favorite = input(false, { transform: booleanAttribute });
}
