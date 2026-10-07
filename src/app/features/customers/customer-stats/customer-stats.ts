import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-customer-stats',
  styleUrl: './customer-stats.css',
  templateUrl: './customer-stats.html',
})
export class CustomerStats {
  protected readonly loadedAt = new Date().toLocaleTimeString('de-DE');
}
