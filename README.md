Firebase Puppeteer
==================

Jak nainštalovať:
```
# nainštaluj firebase tools globalne aby si mal firebase command dostupný
npm install -g firebase-tools

# prihlás sa do firebase
firebase login

# vytvor si firebase projekt na webe
# console.firebase.google.com

# inicializuj projekt
firebase init
# vyber "functions" z medzernikom a stlač enter
# vyber projekt alebo vytvor novy
# vyber jazyk javascript
# nechceš eslint - napiš N enter
# package.json nechceš prepisať - napiš N enter
# index.js nechceš prepisať - napiš N enter
# .gitignore nechceš prepisať - napiš N enter
# dependencies chceš nainštalovať - napiš Y enter

# hotovo

# otestuj lokalne
firebase emulators:start
# alebo deployni na firebase
firebase deploy
```