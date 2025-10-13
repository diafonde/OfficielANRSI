#!/bin/bash
git add .
git commit -m "anrsi version 3 - fixed budget warnings"
git push
ng build --configuration production --base-href "/OfficielANRSI/" --output-path docs
cp docs/index.html docs/404.html
touch docs/.nojekyll
echo "anrsi.mr" > docs/CNAME
git add docs/
git commit -m "Déploiement automatique - budget warnings resolved"
git push origin main