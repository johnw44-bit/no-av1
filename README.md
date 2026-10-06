# No AV1 (YouTube)

Brave/Chrome-tillägg som stänger av AV1 på YouTube. Spelaren väljer då VP9 (eller H.264), som grafikkortet avkodar i hårdvara.

Byggt för en GTX 1080 Ti, som saknar AV1-avkodning i hårdvara. Med AV1 laggade 1080p60 i 2,5x hastighet. Med VP9 flyter det.

## Installera
1. Ladda ner den senaste versionen under [Releases](../../releases) och packa upp den, eller klona repot.
2. Öppna `brave://extensions` (eller `chrome://extensions`) och slå på **Utvecklarläge**.
3. Klicka **Läs in okomprimerat** och välj mappen.
4. Ladda om YouTube-fliken.

Kontroll: högerklicka på videon → **Statistik för nördar**. Under `Codecs` ska det stå `vp09` eller `avc1`, inte `av01`.

## Varför
| | H.264 (`avc1`) | VP9 (`vp09`) | AV1 (`av01`) |
|---|---|---|---|
| År | 2003 | 2013 | 2018 |
| Filstorlek vid samma kvalitet | 100 % | ~65 % | ~50 % |
| Hårdvaruavkodning, GTX 10xx | Ja | Ja | **Nej** |
| Hårdvaruavkodning, RTX 30xx+ / RX 6000+ | Ja | Ja | Ja |

YouTube skickar AV1 till alla webbläsare som säger att de stöder det. Brave säger ja, eftersom den kan avkoda AV1 med processorn. 1080p60 i 2,5x innebär 150 bilder per sekund, och det hinner processorn inte avkoda. Grafikkortets avkodningschip klarar samma mängd VP9 utan problem.

Kostnad: ungefär 30–50 % mer data. Bildkvaliteten är i praktiken densamma.

Har du ett grafikkort med AV1-avkodning behöver du inte tillägget.

## Så fungerar det
`block-av1.js` körs i sidans eget sammanhang innan YouTube-spelaren laddas. Skriptet svarar "stöds inte" på alla AV1-frågor i:
- `MediaSource.isTypeSupported` / `ManagedMediaSource.isTypeSupported`
- `HTMLMediaElement.canPlayType`
- `navigator.mediaCapabilities.decodingInfo`

Tillägget har inga behörigheter och samlar ingen data.

## Versioner
| Version | Ändring |
|---|---|
| 1.0.1 | Utökad README |
| 1.0.0 | Första versionen: blockerar AV1 på YouTube |

## Licens
MIT
