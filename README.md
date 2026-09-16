# Denimade UF, webbplats

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
| `assets/js/denimade.js` | Meny och dropdown. Ingen scrollanimering. |
| `assets/img/` | Här lägger ni de riktiga bilderna |

Header och footer står skrivna i varje HTML-fil. Ändrar ni en meny eller en
länk måste ändringen göras i alla åtta filerna. Sök efter `class="header"`
respektive `class="footer"`.

## Byta ut platshållarna

Allt som står `(Placeholder: …)` är medvetet tomt och väntar på riktigt
innehåll. Inget av det är påhittat.

**Logotypen är på plats.** Den är broderad i ljus tråd på mörk denim, och
fotot är extraherat till två alfamasker:

| Fil | Används av | Innehåll |
|---|---|---|
| `assets/img/denimade-wordmark.png` | `.brand` i headern | enbart "Denimade" |
| `assets/img/denimade-lockup.png` | `.hero__logo`, `.footer__brand` | "Denimade" med "UF" under |

Masken ritas med `mask-image` och `background-color: currentColor`, vilket gör
att märket tar färg av sin omgivning: indigo mot papper, gräddvitt mot indigo.
Samma fil fungerar alltså på båda bottnarna. Vill ni byta färg på märket räcker
det att ändra `color` på elementet.

Utan stöd för `mask-image` faller den tillbaka på texten "Denimade UF", som
alltid finns i markupen för skärmläsare.

Ska logotypen bytas ut: ersätt PNG-filerna med nya masker i samma form, alltså
vitt märke på genomskinlig botten. `aspect-ratio` i CSS:en måste då matcha de
nya filernas proportioner.

**Bilder.** Varje platshållare ser ut så här:

```html
<div class="ph" role="img" aria-label="Platshållare för produktbild">
  <span class="ph__tag">(Placeholder: Produktbild)</span>
  <span class="ph__note">produkten på nära håll, neutral bakgrund och dagsljus</span>
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

**Produktnamn och priser.** I `produkter.html` och `index.html`, i varje
`.product__meta`. Lot-numren är bara ordningsnummer och kan bytas mot riktiga
artikelnummer.

**Siffrorna på hållbarhetssidan och startsidan** ligger i en `<dl class="spec">`.
Varje rad har en tom streckad ruta (`.spec__blank`) och texten "Fylls i"
(`.spec__slot`). Ersätt båda med siffran:

```html
<dd class="spec__value">142</dd>
```

**FAQ-svar.** De tre svar som saknas är märkta med `<p class="slot">`. Ta bort
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
| `--thread` `#c0782e` | sytråd, linjer och pilar |
| `--thread-deep` `#8f5518` | samma ton mörkad tills den bär text |

`--thread` har för låg kontrast för text. Använd den till linjer, pilar och
markeringar. Ska något skrivas i sytrådsfärg, använd `--thread-deep`, som
klarar 5,5:1 mot både papper och ben.

Typsnitt, alla tre från Google Fonts:

| Typsnitt | Roll |
|---|---|
| **Luckiest Guy** | de största rubrikerna: hero, sidrubriker, sektionsrubriker, citat, mobilmeny |
| **Archivo** | allt mindre: brödtext, navigation, produktnamn, FAQ-frågor, processkedjan |
| **Caveat** | handmärkningen |

Luckiest Guy är en displayskärning utan äkta gemener: skriver man gemener
renderas de som kapitäler. Den fungerar bara stort. Under ungefär 24 px blir
den kompakt och svårläst, vilket är varför `h3` och mindre bärs av Archivo
halvfet i stället. Flytta inte ner den i skalan. Vill ni slippa det externa anropet: ladda ner filerna till
`assets/` och byt ut `<link>`-taggen mot en `@font-face`-regel.

Mönstret som ger ytorna materialkänsla (`--twill-light` / `--twill-dark`) är en
CSS-gradient som återger denimens kypertväv. Ingen bildfil inblandad.

## Handmärkningen

Bildanvisningen inuti varje platshållare (`.ph__note`) är satt i Caveat, så
att den läser som en lapp till fotografen i stället för som gränssnittstext.

Utöver det finns fem fristående anteckningar på sajten, en per plats där det
faktiskt finns något att peka ut:

| Sida | Anteckning |
|---|---|
| `index.html` | "inga två lika" vid första produkten |
| `index.html` | "tyget bestämmer formen" vid om-bilden |
| `process.html` | "allt begagnat" vid steg 01 |
| `process.html` | "sömmarna sparas" vid steg 03 |
| `hallbarhet.html` | "kypertväv" vid närbilden på väven |

Markupen ser ut så här. Pilen är en ritad kurva, inte ett tecken:

```html
<p class="note note--up">inga två lika
  <svg class="note__arrow" viewBox="0 0 50 34" aria-hidden="true">
    <path d="M3 5 C 17 3, 33 8, 43 25"/>
    <path d="M36 20 L 45 28 L 34 30"/>
  </svg>
</p>
```

`note--up` vänder pilen uppåt, för anteckningar som ligger under sin bild.
`note--left` vänder den åt vänster.

**Lägg inte till fler utan att de säger något.** Poängen är att de pekar ut
något sant om materialet eller arbetet. Blir de utfyllnad slutar de fungera.

## Designregler att hålla fast vid

Sajten är medvetet återhållsam. Om ni bygger vidare, behåll det här:

- **Inga versaler och ingen spärrad text** utom på platshållartaggarna, där de
  är en teknisk markör
- **Ingen scrollanimering.** Det enda som rör sig är återkoppling på hover,
  meny och fokus
- **Inga rundade hörn, inga skuggor, inga gradienter.** Kypertväven är det enda
  mönstret, sömmen den enda dekorationen
- **Inga kort.** Hårlinjer, mellanrum och typografi bär hierarkin
- **Inga pilar i knappar och länkar**
- **Varje sektion har en egen komposition.** Två sektioner på samma sida ska
  inte se likadana ut
- **Handmärkningen är sparsam.** Fem anteckningar på hela sajten, var och en
  med något att peka på

## Tillgänglighet

- Allt innehåll visas även utan JavaScript
- `prefers-reduced-motion` stänger av samtliga övergångar
- Menyn går att nå med tangentbord, Esc stänger den
- Fokusmarkering är synlig överallt
