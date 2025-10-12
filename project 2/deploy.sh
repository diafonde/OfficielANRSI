#!/bin/bash
git add .
git commit -m "anrsi version 3"
git push
ng build --configuration production --base-href "/ANRSIV3/" --output-path docs
cp docs/index.html docs/404.html
git add docs/
git commit -m "Déploiement automatique"
git push origin main