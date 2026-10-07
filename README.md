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
