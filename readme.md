<div align="center">

# Platforma e-learningowa

### E-learning platform

autor: Krzysztof Kosmowski

</div>

---

for English, please see `readme-en.md`

---



## Spis treści

* [Opis](#opis)
* [Zastosowane technologie](#zastosowane-technologie)
* [Instalacja](#instalacja)
* [Używanie](#używanie)
* [Dostępne funkcjonalności](#dostępne-funkcjonalności)
* [Autor i licencja](#autor-i-licencja)

---



## Opis

Platforma E-Learningowa to efekt pracy inżynierskiej Krzysztofa Kosmowskiego, w postaci aplikacji internetowej pozwalającej na tworzenie i zarządzanie klasami, przedmiotami i użytkownikami.

Aplikacja pozwala tworzyć administratorowi użytkowników, klasy, kategorie przedmiotów oraz przedmioty, a także przypisywać te elementy ze sobą. W rezultacie tworzymy: kategorię "Matematyka", klasę "3A" z uczniami i nauczycielem, a następnie przedmiot "Matematyka" dla klasy "3A".

Wówczas uczniowie mający dostep do tego przedmiotu mogą go przeglądać, wysyłać odpowiedzi na zadania i zadania domowe, zaś nauczyciel może tworzyć te zadanie i wystawiać za nie oceny, a także przesyłać ogłoszenia (komunikaty) do uczniów danego przedmiotu.

Aplikacja powstała w oparciu o posiadaną oraz zdobytą w trakcie implementacji wiedzę, w celach edukacyjnych oraz zaliczeniowych. Kod znajdujący się w tym repozytorium nie jest na sprzedaż oraz nie ma prawa zostać wykorzystany bez wiedzy autora.



## Zastosowane technologie
* `react` jako fundamentalna biblioteka UI
* `typescript` do usprawnienia implementacji (statyczne typowanie)
* `react-query` do obsługi żądań (requestów) do aplikacji serwerowej
* `@mui/material`, `@mui/icons-material` i pochodne, a także `@emotion` do tworzenia i stylowania komponentów
* `i18next` i `react-i18next` do obsługi tłumaczeń



## Instalacja

W celu poprawnego zainstalowania aplikacji i jej zależności, należy posiadać na swojej maszynie:
- środowisko Node
- menadżera paczek: `yarn` lub `npm`

Aby zainstalować aplikację i wszelkie jej zależności należy wykonać jedną z poniższych komend:
* `yarn install`
* `npm install`

w zależności od stosowanego menadżera paczek.



## Używanie

Po zainstalowaniu aplikacja jest gotowa do uruchomienia. Aby to zrobić, należy wykonać jedną z poniższych komend:
* `yarn start`
* `npm start`

Wynikiem tych komend powinna być kompilacja kodu w języku Typescript, a także kodu biblioteki React do zwykłego kodu Javascript. Po zakończeniu, domyślna przeglądarka powinna uruchomić aplikację, najprawdopodobniej pod adresem http://localhost:3000


## Dostępne funkcjonalności
- Administrator
    - Tworzenie, wyświetlanie, modyfikowanie i archiwizacj/aktywacja użytkowników
    - Tworzenie, wyświetlanie i modyfikowanie kategorii przedmiotów
    - Usuwanie kategorii przedmiotów (pod warunkiem, że nie są używane)
    - Tworzenie, wyświetlanie i modyfikowanie klas (przypisywanie nauczyciela i uczniów)
    - Tworzenie, wyświetlanie i modyfikowanie przedmiotów (przypisywanie kategorii przedmiotu i konkretnej klasy, a także nauczyciela prowadzącego)
- Nauczyciel
    - Przeglądanie i zarządzanie danymi przedmiotami
    - Tworzenie, modyfikacja i usuwanie ogłoszeń
    - Tworzenie, modyfikacja i usuwanie zadań oraz zadań domowych
    - Wyświetlanie przesłanych przez uczniów rozwiązań zadań oraz zadań domowych
    - Wystawianie i modyfikowanie ocen za zadania i zadania domowe, a także za zachowanie bądź aktywność
    - Grupowe wystawianie oceny negatywnej uczniom, którzy nie przesłali rozwiązania
    - Wystawianie i modyfikowanie proponowanej oceny końcowej uczniom
    - Wystawianie oceny końcowej uczniom
- Uczeń
    - Przeglądanie danych przedmiotów
    - Przeglądanie opublikowanych ogłoszeń
    - Przeglądanie i odpowiadanie na opublikowane zadania oraz zadania domowe
    - Wysyłanie tekstu oraz pliku w odpowiedzi na zadanie
    - Przeglądanie posiadanych ocen przedmiotu oraz ocen: proponowanej końcowej i końcowej
    - Przeglądanie ocen: średniej, proponowanej i końcowej wszystkich przedmiotów (podsumowanie roku)
- Wspólne
    - System logowania i wylogowania

Aplikacja została zaimplementowana z myślą o urządzeniach desktopowych (komputerach i laptopach).<br />
Nie została przewidziana wersja mobilna.

Aplikacja dostępna jest w języku Polskim i Angielskim. Istnieje możliwość dodania wiekszej ilości języków.



## Autor i licencja

**Platforma E-learningowa** to wynik pracy Krzysztofa Kosmowskiego.

Zabronione jest korzystanie z aplikacji jak i kodu bez wyraźnego zezwolenia. Zabroniona jest sprzedaż i dystrybucja kodu. 

**Wyjątek stanowi przesyłanie i procesowanie kodu w ramach weryfikacji i oceny pracy inżynierskiej.**
