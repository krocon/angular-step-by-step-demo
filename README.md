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
