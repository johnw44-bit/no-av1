# No AV1 (YouTube)

Stänger av AV1 på YouTube. Spelaren väljer då VP9/H.264, som GPU:n avkodar i hårdvara (GTX 10xx saknar AV1-avkodning). 1080p60 i 2,5x utan lagg.

## Installera (Brave/Chrome)
1. `brave://extensions` → slå på **Utvecklarläge**
2. **Läs in okomprimerat** → välj den här mappen
3. Ladda om YouTube-fliken

Kontroll: högerklicka på videon → **Statistik för nördar** → `Codecs` ska visa `vp09` eller `avc1`, inte `av01`.
