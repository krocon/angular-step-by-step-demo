# Angular Schritt für Schritt – Demo-App

Begleit-Repo zur Videoserie **„Angular Schritt für Schritt“**: Wir bauen eine moderne Angular-22-App
(ein kleines Kundenportal) von null an – eine Folge pro Schritt.

Jede Folge hat einen eigenen Stand als Git-Tag:

```bash
git clone https://github.com/krocon/angular-step-by-step-demo.git
cd angular-step-by-step-demo
git checkout ep-003   # Stand nach Folge 003
```

## Folge 001 – Node.js & pnpm

Angular 22 braucht **Node.js 22.22.3+, 24.15+ oder 26+** (wir nutzen die LTS-Version 24, siehe `.nvmrc`).

```bash
node -v              # v24.x
npm install -g pnpm
pnpm -v
```

## Folge 002 – Angular CLI

```bash
npm install -g @angular/cli@22
ng version           # Angular CLI 22.x
```

## Folge 003 – Projekt anlegen mit `ng new`

```bash
ng new kundenportal --package-manager=pnpm --style=css --ssr=false --ai-config=none
cd kundenportal
pnpm start           # → http://localhost:4200
```

Beim allerersten Start fragt die CLI, ob sie anonyme Nutzungsdaten senden darf (y/N).
Standalone, strict (TypeScript 6 + strict Templates), Zoneless und Vitest sind in Angular 22 Standard.

> In diesem Repo liegt das Projekt direkt im Wurzelordner (statt in `kundenportal/`).

## Folge 004 – Rundgang durch die Projektstruktur

```text
angular.json        CLI-Konfiguration: build, serve, test
package.json        Abhängigkeiten & Skripte (start, build, test) – ohne zone.js
tsconfig.json       TypeScript 6: strict ist Standard und steht nicht mehr drin
public/             statische Dateien (favicon.ico)
src/
  index.html        die eine HTML-Seite mit <app-root>
  main.ts           Startpunkt: bootstrapApplication(App, appConfig)
  styles.css        globale Styles
  app/
    app.ts          Root-Komponente (Style Guide 2025: ohne .component im Namen)
    app.html        Template
    app.css         Styles der Komponente
    app.config.ts   globale Provider
    app.routes.ts   Routen
    app.spec.ts     Test (Vitest)
```

## Folge 005 – main.ts und app.config.ts

```ts
// src/main.ts
bootstrapApplication(App, appConfig).catch((err) => console.error(err));

// src/app/app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes)],
};
```

Kein NgModule: Die App startet direkt mit der Root-Komponente, globale Dienste kommen als `provideXxx()`-Funktionen in die Provider-Liste.

## Folge 006 – Die erste eigene Komponente

```bash
ng generate component features/customers/customer-list
```

- `app.html`: Starter-Seite gelöscht → Header mit `{{ title() }}` und `<router-outlet />`
- `features/customers/customer.ts`: Interface `Customer`
- `app.routes.ts`: `{ path: '', component: CustomerList }`

## Folge 007 – signal(): State lesen und schreiben

- `customers = signal<Customer[]>([...])`, `query = signal('')`, `favorites = signal<number[]>([])`
- Lesen: `customers()` · Schreiben: `set(wert)` oder `update(alt => neu)`
- `toggleFavorite(id)` gibt immer ein **neues** Array zurück

## Folge 008 – computed(): abgeleitete Werte

```ts
protected readonly filtered = computed(() => {
  const q = this.query().trim().toLowerCase();
  return this.customers().filter((c) => c.name.toLowerCase().includes(q));
});
protected readonly favoriteCount = computed(() => this.favorites().length);
```

## Folge 009 – effect(): Favoriten im localStorage

```ts
constructor() {
  const saved = localStorage.getItem('favorites');
  if (saved) this.favorites.set(JSON.parse(saved));

  effect(() => {
    localStorage.setItem('favorites', JSON.stringify(this.favorites()));
  });
}
```

Faustregel: Werte berechnen → `computed()`. Nebenwirkungen (Speichern, Logging) → `effect()`.

## Folge 010 – Listen mit @for und track

```html
<ul>
  @for (customer of filtered(); track customer.id) {
    <li>{{ customer.name }} · {{ customer.company.name }}</li>
  } @empty {
    <li>Keine Kunden gefunden.</li>
  }
</ul>
```

## Folge 011 – Property- und Event-Binding: die Suche

```html
<input
  #search
  type="search"
  placeholder="Kunden suchen …"
  [value]="query()"
  (input)="query.set(search.value)"
/>
```

`[ ]` = Daten ins Element (Property Binding) · `( )` = Events aus dem Element (Event Binding) · `#search` = Template-Variable

## Folge 012 – @if und @let

```html
@let count = filtered().length;
<p>{{ count }} von {{ customers().length }} Kunden</p>

@if (favoriteCount() > 0) {
  <p>⭐ {{ favoriteCount() }} Favoriten</p>
} @else {
  <p>Noch keine Favoriten. Klick auf den Stern!</p>
}
```

Dazu pro Zeile ein Stern-Button: `(click)="toggleFavorite(customer.id)"`.

## Folge 013 – @switch: Liste oder Karten

```ts
protected readonly view = signal<'list' | 'cards'>('list');
```

```html
@switch (view()) {
  @case ('list') { <ul>…</ul> }
  @case ('cards') { <div class="cards">…</div> }
}
```

## Folge 014 – @defer: Code erst laden, wenn er gebraucht wird

```bash
ng generate component features/customers/customer-stats
```

```html
@defer (on viewport) {
  <app-customer-stats />
} @placeholder {
  <p>Statistik wird geladen …</p>
}
```

`pnpm build` zeigt danach einen eigenen **Lazy chunk** für `customer-stats`.

## Folge 015 – input() und input.required()

```bash
ng generate component features/customers/customer-card
```

```ts
readonly customer = input.required<Customer>();
readonly favorite = input(false, { transform: booleanAttribute });
```

```html
<app-customer-card [customer]="customer" [favorite]="favorites().includes(customer.id)" />
```

## Folge 016 – output(): Events nach oben melden

```ts
readonly favoriteToggle = output<number>();
```

```html
<!-- customer-card.html -->
<button type="button" class="star" (click)="favoriteToggle.emit(customer().id)">…</button>

<!-- customer-list.html -->
<app-customer-card … (favoriteToggle)="toggleFavorite($event)" />
```
