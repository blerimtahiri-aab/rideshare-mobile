# RideShare — Java 4 · Neon dhe PostgreSQL

Ruaje këtë skedar si java-04.md pranë README, jashtë aplikacioni/.
Plotëso të gjitha përgjigjet; hiqi shenjat [PLOTËSO].
Mos vendos DATABASE_URL, pamje të kredencialeve ose të dhëna reale.

## Çfarë ndërtova
Vargu fiks i udhëtimeve nga Java 3 u zëvendësua me tabelën `udhetimet` në Neon (PostgreSQL). Lista (/) thërret `lexoUdhetimet()`, ndërsa detajet (/udhetimi/[id]) dhe kërkesa (/udhetimi/[id]/kerkesa) thërrasin `gjejUdhetimin(id)`, ku ID kalon si parametër te driver-i Neon, jo si tekst i bashkuar me SQL. Të gjitha leximet bëhen në server me `await`; `DATABASE_URL` lexohet vetëm në `src/lib/db.ts`, i mbrojtur me `server-only`. Faqet kanë `force-dynamic`, prandaj çdo hapje ose rifreskim e pyet databazën përsëri. Ruajta edhe kolonën `shoferi` dhe anulimin e kërkesës nga Java 3.

## Provat që bëra
### Prova 1: Ndryshimi në databazë shfaqet në aplikacion
[PLOTËSO] Ndryshova orën e ID 2 nga 08:15 në 08:25 në SQL Editor.
Shkruaj çfarë tregoi lista dhe çfarë treguan detajet pas rifreskimit.
Ktheje orën në 08:15 dhe provo përsëri.

### Prova 2: Lista bosh dhe rikthimi
[PLOTËSO] Shtova WHERE false vetëm te pyetja e lexoUdhetimet.
Shkruaj mesazhin që u shfaq. Hoqe WHERE false dhe u kthyen tri kartat?

### Prova 3: Lidhja mungon, rikthimi dhe siguria
[PLOTËSO] Ndryshova përkohësisht emrin DATABASE_URL në .env.local,
rinisa serverin dhe shënova mesazhin. Riktheva emrin dhe rinisa serverin.
Shkruaj a punoi sërish; a mungon .env.local në listën e GitHub Desktop?

## Ku gjendet puna
- `aplikacioni/schema.sql`: tabela `udhetimet` me tri udhëtime fiktive
- `aplikacioni/src/lib/db.ts` (i ri): lidhja private me Neon
- `aplikacioni/src/lib/udhetimet.ts`: pyetjet SQL `lexoUdhetimet` dhe `gjejUdhetimin`
- `aplikacioni/src/app/page.tsx`: lista
- `aplikacioni/src/app/udhetimi/[id]/page.tsx`: detajet
- `aplikacioni/src/app/udhetimi/[id]/kerkesa/page.tsx`: simulimi i kërkesës
- `aplikacioni/package.json`: paketat `@neondatabase/serverless` dhe `server-only`

Repository: https://github.com/blerimtahiri-aab/rideshare-mobile

## Çfarë mbetet për përmirësim
Kërkesa “Në pritje” dhe anulimi mbeten simulim: nuk ruhet asnjë rezervim dhe numri i vendeve në Neon nuk ndryshon. Aplikacioni vetëm lexon; ndryshimet i bën pronari i databazës në SQL Editor. Hapi i ardhshëm: hyrja e shoferit dhe kontrolli në server që secili shofer ndryshon vetëm udhëtimet e veta.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
[PLOTËSO] Përdora AI (Claude Code) për të përshtatur kodin e udhëzimit të Javës 4 me projektin tim (kolona `shoferi`, komponenti i anulimit dhe stilet e Javës 3), për të shkruar schema.sql dhe për të kontrolluar build-in. Shkruaj këtu çfarë verifikove vetë: lidhjen e Neon, tri provat dhe që .env.local nuk shfaqet në GitHub Desktop.
