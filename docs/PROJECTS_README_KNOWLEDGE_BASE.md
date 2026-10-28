# Baza Wiedzy Projektów — Kompendium README z GitHub

Niniejszy dokument stanowi kompletne, usystematyzowane zestawienie informacji technicznych, architektonicznych oraz organizacyjnych wyciągniętych bezpośrednio z repozytoriów GitHub i plików README projektów autorstwa **Mikołaja Mołodeckiego** (`MiniowaPM`) oraz zespołów (**KNI Politechniki Morskiej**, **JSON Derulo**, **HackNation**).

Dokument przygotowano jako fundament do rozbudowy szczegółowych opisów (Case Studies) na stronie portfolio.

---

## Spis Treści
1. [Projekty Flagowe (Featured)](#1-projekty-flagowe-featured)
   - [PlanPM — Aplikacja Mobilna Politechniki Morskiej](#planpm)
   - [ALEKSY — Edge Voice Assistant (Unit 01)](#aleksy)
   - [NavigatorPM — Nawigacja Wewnątrzbudynkowa Kampusu](#navigatorpm)
   - [hubmi.pl — Platforma Innowacji Społecznych (HackYeah 2026)](#hubmipl)
   - [World of Drones — GlobalLogic IoT Internship](#world-of-drones)
   - [Real-Time Ocean Simulation & Ship Simulator](#ocean-simulation)
2. [Projekty Archiwalne i Akademickie (Archive / Extended)](#2-projekty-archiwalne-i-akademickie)
   - [ŁatwaUstawa — Asystent Legislacyjny AI (HackNation 2025)](#łatwaustawa)
   - [TicketMaster — eBilet Sniper](#ticketmaster)
   - [E.D.E.K. ChatBot — Wyszukiwanie Semantyczne](#edek-chatbot)
   - [Reptilia (BetterSpotify) — Desktop Audio Platform](#reptilia)
   - [CryptoApp — Interaktywny Pakiet Kryptograficzny](#cryptoapp)
   - [MatrixCalc — Desktopowy Kalkulator Macierzowy C++](#matrixcalc)
3. [Projekty Dodatkowe / Odkrycia z Repozytoriów](#3-projekty-dodatkowe--odkrycia)
   - [VAT-Sentinel — Silnik Detekcji Karuzel VAT i AML w C++17](#vat-sentinel)
   - [openwakeword-local-trainer — Trener Słów Wybudzających Offline](#openwakeword-local-trainer)
   - [RoomPM — Wyszukiwarka Wolnych Sal (KNI)](#roompm)
   - [Fryderyk — Bot Audytowy i Logujący Discord (KNI)](#fryderyk)

---

## 1. Projekty Flagowe (Featured)

### PlanPM
- **Status:** Produkcyjny (Ponad 1000 aktywnych pobrań w Google Play i Apple App Store)
- **Repozytorium:** [`KNI-PM-Szczecin/plan_pm`](https://github.com/KNI-PM-Szczecin/plan_pm)
- **Rola Mikołaja:** Architektura backendu, modelowanie bazy danych Supabase, potok scrapingu, rozwój modułów Flutter, rozwiązywanie błędów i utrzymanie.
- **Licencja:** Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) — darmowa na zawsze dla studentów.
- **Stack technologiczny:**
  - **Frontend:** Flutter, Dart, Supabase Client SDK, natywne widgety ekranu głównego (iOS WidgetKit w Swift, Android AppWidget).
  - **Backend:** Python, BeautifulSoup4, Flask (panel administracyjny), Supabase (PostgreSQL + Storage).
  - **DevOps / Narzędzia:** CI/CD zautomatyzowane publikacje do sklepów, `mcp_server` (narzędzia MCP do zarządzania bazą przez agentów AI).

#### Architektura i Przepływ Danych (Data Pipeline)
Potok scrapingu danych z Wirtualnego Dziekanatu uczelni podzielony jest na 4 modularne etapy:
```
Mapper ──► Scrapper ──► Parser ──► json2db
```
1. **`mapper/`**: Bada i odkrywa aktywne identyfikatory planów zajęć przez zapytania HTTP.
2. **`scrapper/`**: Pobiera zawartość stron harmonogramów metodą HTTP POST.
3. **`parser/`**: Normalizuje surowe dane HTML, deduplikuje wpisy, wyodrębnia prowadzących, sale, przedmioty i grupy ćwiczeniowe.
4. **`json2db/`**: Wykonuje operacje upsert do relacyjnej bazy Supabase Postgres.
5. **`structure_updater/`**: Osobny proces dbający o aktualność hierarchii uczelni (*Wydziały → Kierunki studiów → Specjalności*).
6. **`admin/`**: Lokalny panel we Flasku do zarządzania ogłoszeniami uczelnianymi, podglądu logów scrapingu na żywo, monitorowania statystyk pobrań i przełączania środowisk.

#### Kluczowe Funkcjonalności
- Widok dzienny i tygodniowy z filtrowaniem według kierunku, roku i grupy.
- **Tryb Wykładowcy:** przeglądanie własnego planu zajęć przez kadrę akademicką.
- **Natywne widgety:** 3 rozmiary na iOS (WidgetKit) i Androidzie, z podglądem najbliższych zajęć bez otwierania aplikacji.
- **Obsługa 3 języków:** polski, angielski, ukraiński.
- Motyw jasny/ciemny oraz dynamiczne kolory akcentu.
- Kanał aktualności z ogłoszeniami uczelnianymi.

---

### ALEKSY
- **Pełna nazwa:** Autonomous Local Encrypted Knowledge System Yield (Unit 01)
- **Status:** Ukończony działający prototyp fizyczny (zaprezentowany w wideo na żywo)
- **Repozytorium:** [`MiniowaPM/voice-assistant`](https://github.com/MiniowaPM/voice-assistant) oraz repozytorium wspierające [`openwakeword-local-trainer`](https://github.com/MiniowaPM/openwakeword-local-trainer)
- **Demo wideo:** [YouTube Shorts (V51wDqSVl7A)](https://youtube.com/shorts/V51wDqSVl7A)
- **Założenie:** Asystent głosowy w 100% offline (air-gapped), mówiący po polsku. Żadne dane, nagrania audio ani zapytania nie opuszczają urządzenia.

#### Sprzęt (Hardware Unit 01)
- **Jednostka główna:** NVIDIA Jetson Xavier NX (JetPack 5.1.3, Linux aarch64).
  - **CPU:** 6-rdzeniowy procesor Carmel ARM v8.2.
  - **GPU:** Architektura Volta, 384 rdzenie CUDA (dedykowane wyłącznie pod wnioskowanie LLM).
  - **Pamięć:** 8 GB zunifikowanej pamięci LPDDR4x (współdzielona RAM/VRAM).
- **Audio:** Mikrofon krawatowy USB z adapterem C-Media, wbudowane podwójne głośniki stereo.
- **Zasilanie:** Powerbank USB-C — praca w 100% bezprzewodowa.
- **Autorska obudowa 3D:** Zaprojektowana w programie Rhinoceros (`3d case/*.3dm`), wydrukowana z pomarańczowego PLA. Zawiera kratki wentylacyjne, mocowania głośników, kanały na kable i wytłoczone logo „A.L.E.K.S.Y. — UNIT 01”.

#### Potok Przetwarzania (Pipeline)
```
Mowa wejściowa ──► [openWakeWord] (detekcja słowa "Aleksy") ──► Odpowiedź dźwiękowa "Tak?"
               ──► [faster-whisper] (transkrypcja STT na int8 CPU z VAD) ──► Dźwięk "Chwileczkę..."
               ──► [Ollama + Bielik 7B v0.1 Q3_K_M] (inferencja na GPU Volta)
               ──► [Piper TTS: pl_PL-darkman-medium] (synteza mowy) ──► Odtworzenie audio
```

#### Kluczowe Funkcjonalności i Architektura
- **Błyskawiczny feedback:** Pre-renderowany plik audio „Tak?” odtwarzany natychmiast po wykryciu słowa kluczowego (0 ms opóźnienia syntezy), a następnie „Chwileczkę...” na czas transkrypcji.
- **Pamięć konwersacji:** Krocząca historia 5 ostatnich wymian zdań przechowywana wyłącznie w RAM (nigdy nie zapisywana na dysku).
- **Świadomość systemowa i czasu:** Wstrzykiwanie aktualnego czasu słownie po polsku oraz odczytów temperatury CPU i zużycia RAM (możliwość zapytania: *„Jak się czujesz?”*).
- **Timery głosowe:** Rozpoznawanie poleceń w tle (np. *„Ustaw timer na 5 minut”*).
- **Automatyczny start:** Usługa `systemd` uruchamiająca asystenta po włączeniu zasilania Jetsona.
- **Wnioski inżynierskie:** Wąskim gardłem okazał się czas transkrypcji STT na CPU (5–8 s na 2-sekundowe zdanie) oraz ograniczenia wiekowe JetPack 5 (starsze wersje bibliotek i pamięć 8 GB dla modeli 7B). Dało to impuls do planowania Unit 02 (Raspberry Pi 5 + model hybrydowy).

---

### NavigatorPM
- **Tytuł:** Wewnątrzbudynkowy system nawigacji kampusowej Politechniki Morskiej
- **Repozytorium:** [`KNI-PM-Szczecin/NavigatorPM`](https://github.com/KNI-PM-Szczecin/NavigatorPM)
- **Koncepcja:** „Google Maps dla wnętrz budynków” — maksymalna wydajność, zero bazy SQL, zero opóźnień.
- **Stack:** Next.js (App Router), TypeScript, mapy wektorowe SVG.

#### Architektura „Zero-Latency”
- **Brak tradycyjnej bazy danych:** Cały model matematyczny kampusu (węzły, korytarze, sale, piętra) ładowany jest z pliku `src/data/map.json` do pamięci RAM serwera podczas startu.
- **Słowniki O(1):** `mapStore.ts` tworzy zindeksowane tablice asocjacyjne, dzięki czemu zapytania API odpowiadają w ułamkach milisekund.
- **Klient-Side Routing:** Całość obliczeń grafowych (algorytm Dijkstry) wykonuje się bezpośrednio w przeglądarce smartfona użytkownika.

#### Kluczowe Funkcjonalności
- **Skanowanie kodów QR:** Użytkownik skanuje kod na ścianie korytarza, a aplikacja natychmiast ustala jego pozycję początkową i ładuje właściwe piętro.
- **Tryb dostępności (Accessibility Mode):** Obliczanie tras bez barier architektonicznych (omijanie schodów, preferowanie wind) dla osób z niepełnosprawnościami i wózków.
- **Obsługa wielu kondygnacji:** Płynne przełączanie pięter z automatyczną zmianą wektorowych podkładów SVG.
- **Wielojęzyczność (i18n):** Nazwy sal i instrukcje po polsku, angielsku i ukraińsku.

---

### hubmi.pl
- **Wydarzenie:** HackYeah 2026 (Tauron Arena Kraków, hackathon 24-godzinny)
- **Zespół:** **JSON Derulo** (6 osób: Mikołaj Mołodecki, Piotr Wittig, Karol Wroński, Paweł Dutkiewicz, Scarlet Dorożalska, Aleksy Chojnowski).
- **Zadanie partnerskie:** Regionalny Ośrodek Polityki Społecznej w Krakowie (ROPS) / Urząd Marszałkowski Województwa Małopolskiego.
- **Repozytorium:** [`MasterSun8/hubmi.pl`](https://github.com/MasterSun8/hubmi.pl)
- **Demo:** [Wideo na YouTube (q_ZCYjqOdYQ)](https://www.youtube.com/watch?v=q_ZCYjqOdYQ)
- **Wynik jury:** Średnia ważona **7.35 / 10** (średnia wszystkich drużyn w konkursie: 5.57).
  - *Spełnienie wyzwania:* 7.50
  - *Dostępność i intuicyjność:* 7.50
  - *Jakość MVP i materiałów:* 7.50
  - *Potencjał wdrożeniowy:* 7.00
- **Kolor przewodni:** `#C52783` (malinowa magenta).
- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion, Drizzle ORM, PostgreSQL + pgvector, OpenAI API (Responses API + `text-embedding-3-small`), Zod, OpenStreetMap + Nominatim.

#### Kluczowe Moduły
1. **`/zglos-problem`:** Obywatel pisze w języku naturalnym o problemie społecznym. Czat strumieniowany przez Server-Sent Events (SSE). Wbudowany RAG przeszukuje bazę 115 innowacji ROPS. Przy zagrożeniu życia asystent automatycznie kieruje pod numer 112.
2. **`/zaoferuj-pomoc`:** Rozmowa o pomyśle mieszkańca z fiszką aktualizowaną w locie. Przejście do **Kanwy Innowacji Społecznej** (9 pól uzupełnionych przez AI, eksport do PDF) oraz generatora wniosku o dofinansowanie pod konkretne kryteria naboru.
3. **`/admin` (Panel ROPS):** Podsumowania AI zgłoszeń, kategoryzacja (14 kategorii), ocena poziomu ryzyka z uzasadnieniem, dwustronny matchmaking innowacji i **Interaktywna Mapa Potrzeb** (149 wskaźników społecznych w 22 powiatach Małopolski).
4. **Dostępność:** Spełnienie standardu WCAG 2.1 AA (przełącznik wysokiego kontrastu, skalowanie fontów A / A+ / A++).

---

### World of Drones
- **Kontekst:** GlobalLogic Summer Internship 2025 (Koszalin & Szczecin, lipiec – wrzesień 2025, 480 godzin).
- **Profil:** Inżynieria systemów IoT, Edge AI, programowanie embedded oraz dashboardy dyspozytorskie.
- **Metodologia:** Komercyjny Scrum (Daily standupy, Weekly sprint planningi, code review).
- **Stack:** Platforma dronowa Crazyflie, mikrokontrolery STM32, Raspberry Pi, Python (FastAPI), React, modele detekcji Nano AI / Computer Vision, Autodesk Fusion (projektowanie obudów 3D).
- **Kluczowe osiągnięcia:**
  - Opracowanie lekkich modeli widzenia komputerowego dostosowanych do brzegowych platform o rygorystycznym budżecie energetycznym i wagowym.
  - Zaprojektowanie w Autodesk Fusion obudów tłumiących wibracje na ramę drona i automatyczne lądowisko.
  - Stworzenie asynchronicznego backendu telemetrycznego i panelu dyspozytorskiego z podglądem wideo i telemetrii lotu w czasie rzeczywistym.

---

### Real-Time Ocean Simulation & Maritime Autonomous Simulator
- **Kontekst:** Praca inżynierska Mikołaja Mołodeckiego na Politechnice Morskiej w Szczecinie oraz projekt zespołowy symulatora statku.
- **Repozytoria:** [`JakubLopyta/ship-simulator`](https://github.com/JakubLopyta/ship-simulator) oraz praca inżynierska na dysku uczelnianym.
- **Stack:** Unity (2021.3+ LTS), C#, shadery HLSL, fizyka hydrodynamiki, TextMeshPro.
- **Kluczowe zagadnienia techniczne:**
  - **Fizyka fal Gerstnera:** Proceduralna synteza fal na GPU w shaderach wierzchołkowych HLSL z dynamicznym przemieszczeniem siatki.
  - **Optyka wody:** Tłumienie i absorpcja światła w głębinie oparte na prawie Beera-Lamberta, normal mapping, dynamiczne generowanie piany na grzbietach fal.
  - **Pływalność jednostek (Buoyancy):** Próbkowanie wysokości powierzchni wody na CPU ze zrównolegleniem zadań do wyznaczania sił wyporu i oporu hydrodynamicznego kadłuba.
  - **Interfejs telemetryczny symulatora:** Moduł `ShipUIController.cs` i `Ship.cs` — sterowanie mocą silnika (0–100%) i kątem płetwy steru, wyświetlanie parametrów żeglugowych: prędkość (m/s), prędkość nad dnem (SOG), prędkość kątowa (°/s), kurs nad dnem (COG) oraz kurs rzeczywisty (HDG).

---

## 2. Projekty Archiwalne i Akademickie

### ŁatwaUstawa
- **Wydarzenie:** HackNation 2025
- **Repozytorium:** [`Schoji/LatwaUstawa`](https://github.com/Schoji/LatwaUstawa)
- **Zespół:** Piotr Wittig (Frontend/Full-Stack), Patryk Piaścik (AI), **Mikołaj Mołodecki (Backend Developer)**, Feliks Łubiński (UI/UX).
- **Idea:** „Demokratyzacja prawa przez sztuczną inteligencję”. Streszczanie skomplikowanych projektów ustaw sejmowych do przystępnych wpisów przypominających feed z platformy X (Twitter).
- **Stack:** Flutter (Dart), FastAPI (Python), modele DeepSeek przez Hugging Face API, otwarte API Sejmu RP.
- **Rola Mikołaja:** Architektura i implementacja backendu w FastAPI, obsługa integracji z modelami językowymi i parsowanie aktów prawnych.

---

### TicketMaster
- **Podtytuł:** eBilet Sniper / Ticket Procurement Bot
- **Repozytorium:** [`MiniowaPM/TicketMaster`](https://github.com/MiniowaPM/TicketMaster)
- **Geneza:** Stworzony po wyprzedaniu w ułamku sekundy biletów na Mistrzostwa Świata w Siatkówce, aby wyrównać szanse z komercyjnymi botami scalperskimi.
- **Stack:** Python 3.10+, Playwright (Sync API), `playwright-stealth`, CustomTkinter, Pydantic.
- **Architektura:**
  - Wzorzec MVC rozdzielający usługi automatyzacji od widoków desktopowych.
  - Asynchroniczne wątki robotów zapobiegające zamrażaniu interfejsu graficznego.
  - Wstrzykiwanie skryptów JS snapshotujących ciasteczka sesyjne co 1 sekundę.
  - Obsługa interaktywnych map siedzeń opartych o Canvas HTML5 w przypadku braku standardowych węzłów DOM.
  - Filtrowanie stref cenowych (najtańsze, VIP, dowolne dostępne miejsce).

---

### E.D.E.K. ChatBot
- **Pełna nazwa:** Eksperymentalny Doradca Emitujący Komunikaty (ChatBotMini)
- **Repozytorium:** [`MiniowaPM/ChatBotMini`](https://github.com/MiniowaPM/ChatBotMini)
- **Stack:** Python, Flask, `sentence-transformers` (`paraphrase-multilingual-MiniLM-L12-v2`), scikit-learn, numpy, frontend w PHP / HTML5 / CSS3 / Vanilla JS.
- **Kluczowa technologia:**
  - Wyszukiwanie semantyczne oparte na podobieństwie cosinusowym wektorów osadzeń (embeddings) zamiast sztywnego dopasowywania słów kluczowych.
  - **Tryb „Bake Mode” (`bake_mode.py`):** Prekompilacja bazy pytań i odpowiedzi z JSON do skompilowanych wektorów numerycznych `.npy`, eliminująca opóźnienia zimnego startu serwera.
  - Próg pewności `> 0.5` do odrzucania pytań spoza domeny.

---

### Reptilia
- **Wcześniejsza nazwa:** BetterSpotify
- **Repozytorium:** [`MiniowaPM/Reptilia`](https://github.com/MiniowaPM/Reptilia)
- **Opis:** Wieloplatformowa aplikacja desktopowa do przeglądania i zakupu albumów muzycznych oraz pojedynczych utworów z niezależnych studiów nagraniowych, z panelem wgrywania muzyki dla artystów.
- **Stack:** Vue.js + Electron (frontend desktopowy), FastAPI (Python backend).

---

### CryptoApp
- **Repozytorium:** [`MiniowaPM/CryptoApp`](https://github.com/MiniowaPM/CryptoApp)
- **Wdrożenie Live:** [cryptoapp-miniowa.streamlit.app](https://cryptoapp-miniowa.streamlit.app/)
- **Stack:** Python, Streamlit, biblioteki kryptograficzne (`hashlib`, `cryptography`).
- **Funkcjonalność:** Szyfrowanie symetryczne AES (szyfrowanie i deszyfrowanie hasłem w czasie rzeczywistym) oraz bezpieczne haszowanie kryptograficzne SHA do weryfikacji integralności danych. Całość przetwarzana w pamięci ulotnej bez zapisywania kluczy na dysku.

---

### MatrixCalc
- **Repozytorium:** [`MiniowaPM/MatrixCalc`](https://github.com/MiniowaPM/MatrixCalc)
- **Stack:** C++ (C++11/C++17), wxWidgets (wieloplatformowy natywny interfejs GUI).
- **Zastosowanie:** Desktopowy kalkulator algebry liniowej: dodawanie, odejmowanie, mnożenie macierzy, operacje skalarne, wyznacznik macierzy, transpozycja oraz odwracanie macierzy.

---

## 3. Projekty Dodatkowe / Odkrycia z Repozytoriów

### VAT-Sentinel
- **Repozytorium:** [`MiniowaPM/VAT-Sentinel`](https://github.com/MiniowaPM/VAT-Sentinel) oraz kopia lokalna `c:\Users\miko\source\repos\VAT Sentinel`
- **Tytuł:** RegTech / AML Anomaly Detection Engine
- **Stack:** Nowoczesny C++17, CMake (3.15+), biblioteka sieciowa `cpr`, parser `nlohmann/json`.
- **Architektura:**
  - **In-Memory Graph Engine:** Modelowanie sieci transakcyjnych przy pomocy zoptymalizowanej listy sąsiedztwa (`std::unordered_map`), gdzie węzłami są podmioty gospodarcze (`Company`), a krawędziami transakcje finansowe (`Transaction`).
  - **Wykrywanie cykli karuzelowych:** Implementacja algorytmu przeszukiwania w głąb (DFS) do automatycznej identyfikacji zamkniętych pętli transakcyjnych typowych dla wyłudzeń podatku VAT.
  - **Potok OSINT i API Rządowe:** Automatyczne odpytywanie na żywo API Ministerstwa Finansów (Biała Lista Podatników VAT) oraz API Ministerstwa Sprawiedliwości (KRS) w celu weryfikacji statusu VAT, kapitału zakładowego i składu zarządu.
  - **Wysoka wydajność:** Autorski parser CSV zdolny do błyskawicznego wczytywania dziesiątek tysięcy rekordów transakcji finansowych.

---

### openwakeword-local-trainer
- **Repozytorium:** [`c:\Users\miko\source\repos\openwakeword-local-trainer`](file:///c:/Users/miko/source/repos/openwakeword-local-trainer)
- **Geneza:** Naprawa zerwanego ekosystemu oficjalnego Google Colab `openwakeword` (niekompatybilności torchaudio, HF dataset i piper).
- **Zastosowanie:** Samodzielne trenowanie modeli słów wybudzających `.onnx` w 100% lokalnie na CPU w ~2 minuty (bez karty GPU, bez chmury).
- **Mechanizm:** Generowanie setek próbek pozytywnych syntezatorem mowy Piper TTS, pobieranie 2000 godzin negatywnych próbek audio ze zbioru ACAV100M, ekstrakcja cech i dotrenowanie sieci neuronowej (DNN). Narzędzie posłużyło do trenowania modeli dla asystenta ALEKSY.

---

### RoomPM
- **Repozytorium:** [`KNI-PM-Szczecin/room_pm`](https://github.com/KNI-PM-Szczecin/room_pm)
- **Rola w ekosystemie:** Narzędzie koła KNI zintegrowane z bazą danych PlanPM, pozwalające studentom błyskawicznie znajdować wolne sale wykładowe i laboratoria na kampusie Politechniki Morskiej.
- **Stack:** Bot Discord (`nextcord`), SQLite, integracja z Supabase PlanPM, potok CI/CD Jenkins na Mac mini w klastrze Docker.

---

### Fryderyk
- **Repozytorium:** [`KNI-PM-Szczecin/Fryderyk`](https://github.com/KNI-PM-Szczecin/Fryderyk)
- **Zastosowanie:** Zaawansowany bot logujący i audytowy na serwerze Discord koła naukowego KNI.
- **Stack:** Python 3.12, `nextcord`, PostgreSQL, Docker, pełna obsługa strefy czasowej `Europe/Warsaw`, backfill historii czatów.

---
*Plik wygenerowany automatycznie na podstawie analizy repozytoriów GitHub i kodu źródłowego.*
