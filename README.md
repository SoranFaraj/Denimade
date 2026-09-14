# Denimade UF — webbplats

Statisk webbplats för Denimade UF, ett UF-företag som gör accessoarer av
återbrukad denim.

Ren HTML, CSS och JavaScript. Inget byggsteg, inga beroenden, inget
npm-installera. Öppna `index.html` i en webbläsare, eller lägg filerna på
valfri statisk värd (GitHub Pages fungerar direkt).

```
python3 -m http.server 8000     # lokal förhandsvisning på http://localhost:8000
```

## Filer

| Fil | Innehåll |
|---|---|
| `index.html` | Startsida |
| `produkter.html` | Sortimentet |
| `om-denimade.html` | Om Denimade |
| `process.html` | Vår process |
| `hallbarhet.html` | Hållbarhet |
| `teamet.html` | UF-teamet |
| `faq.html` | Vanliga frågor |
| `kontakt.html` | Kontakt och sociala medier |
| `assets/css/denimade.css` | All styling, indelad i numrerade avsnitt |
| `assets/js/denimade.js` | Meny, dropdown och inanimering |
| `assets/img/` | Här lägger ni de riktiga bilderna |

Header och footer står skrivna i varje HTML-fil. Ändrar ni en meny eller en
länk måste ändringen göras i alla åtta filerna — sök efter `class="header"`
respektive `class="footer"`.

## Byta ut platshållarna

Allt som står `(PLACEHOLDER – …)` är medvetet tomt och väntar på riktigt
innehåll. Inget av det är påhittat.

**Logotyp** — finns på tre ställen per sida:

| Klass | Var |
|---|---|
| `.brand` | i headern |
| `.hero__logo` | i heron på startsidan |
| `.footer__brand` | i footern |

Byt ut elementets textinnehåll mot en `<img>` eller inlinad SVG och ta bort
`border`-raden för respektive klass i CSS:en.

**Bilder** — varje platshållare ser ut så här:

```html
<div class="ph" role="img" aria-label="Platshållare för produktbild">
  <span class="ph__tag">(PLACEHOLDER – PRODUKTBILD)</span>
  <span class="ph__note">produkten på nära håll · dagsljus</span>
</div>
```

`ph__note` beskriver vilken bild som ska in. Ersätt hela `<div>` med:

```html
<img src="assets/img/lot-01.jpg" alt="Beskrivning av vad bilden visar"
     width="1200" height="1500" loading="lazy">
```

Storleksklasserna `ph--wide` (3:2), `ph--square` (1:1), `ph--tall` (2:3) och
`ph--band` (21:9) säger vilket format bilden ska ha. `ph--onDark` används på
indigo bakgrund.

**Produktnamn och priser** — i `produkter.html` och `index.html`, i varje
`.product__meta`. Lot-numren är bara ordningsnummer och kan bytas mot riktiga
artikelnummer.

**Siffrorna på hållbarhetssidan** — `.figure__value` innehåller ett tankstreck.
Byt det mot siffran, ta bort `aria-hidden="true"` och ta bort raden med
`.figure__slot`.

**FAQ-svar** — de tre svar som saknas är märkta med `<p class="slot">`. Ta bort
den raden när svaret skrivs.

## Designsystem

Färgerna och typografin ligger som CSS-variabler överst i `denimade.css`. Ändra
dem där, inte längre ner i filen.

| Variabel | Roll |
|---|---|
| `--indigo` `#1c3050` | identitetsfärg |
| `--paper` `#f4f1ea` | huvudyta |
| `--bone` `#e7e2d8` | sekundär yta och hårlinjer |
| `--ink` `#14161a` | brödtext |
| `--grey` `#63605a` | meta och bildtexter |
| `--thread` `#c0782e` | sytråd — dekoration och accent |

`--thread` har för låg kontrast för brödtext. Använd den bara till linjer,
markeringar och versal etikettext, aldrig till löpande text.

Typsnitt: **Fraunces** för rubriker, **Archivo** för allt annat. Båda hämtas
från Google Fonts. Vill ni slippa det externa anropet — ladda ner filerna till
`assets/` och byt ut `<link>`-taggen mot en `@font-face`-regel.

Mönstret som ger ytorna materialkänsla (`--twill-light` / `--twill-dark`) är en
CSS-gradient som återger denimens kypertväv. Ingen bildfil inblandad.

## Tillgänglighet och rörelse

- Allt innehåll visas även utan JavaScript
- `prefers-reduced-motion` stänger av samtliga övergångar
- Menyn går att nå med tangentbord; Esc stänger den
- Fokusmarkering är synlig överallt

Behåll det om ni bygger vidare.
