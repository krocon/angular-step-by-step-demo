import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBox } from './search-box';

describe('SearchBox', () => {
  let fixture: ComponentFixture<SearchBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBox],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBox);
    await fixture.whenStable();
  });

  it('writes typed text into the model', () => {
    const input = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.value()).toBe('abc');
  });
});
