## Działanie mapy

1. `MapContainer` - główny komponent mapy, kontener na mapę, zawiera przesuwalną warstwę `MapLayer`.
2. `MapLayer` - dostaje referencję do kontenera, sama jest divem z podpiętymi odpowiednimi eventami,
  przez hooka `useMapController` oddaje kontrolę do `MapController`.
3. `MapController` - poza reactem kontroluje mape. Przesówa i skaluje mape z użyciem CSS transform.
  Zawartość powinna być pozycjonowana równierz z użyciem CSS transform
  https://developer.mozilla.org/en-US/docs/Web/CSS/transform


### Wygenerowano narzędziem create-react-app
```
npx create-react-app my-app --template typescript
```
