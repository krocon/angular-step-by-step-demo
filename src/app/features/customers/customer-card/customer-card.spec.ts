import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerCard } from './customer-card';

describe('CustomerCard', () => {
  let fixture: ComponentFixture<CustomerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerCard);
    fixture.componentRef.setInput('customer', {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      company: { name: 'Romaguera-Crona' },
    });
    await fixture.whenStable();
  });

  it('renders the customer name', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('h3')?.textContent).toContain(
      'Leanne Graham',
    );
  });

  it('marks favorites', async () => {
    fixture.componentRef.setInput('favorite', '');
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('.favorite')).toBeTruthy();
  });

  it('emits the id when the star is clicked', () => {
    let emitted: number | undefined;
    fixture.componentInstance.favoriteToggle.subscribe((id) => (emitted = id));
    ((fixture.nativeElement as HTMLElement).querySelector('button') as HTMLButtonElement).click();
    expect(emitted).toBe(1);
  });
});
