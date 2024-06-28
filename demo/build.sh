#!/bin/sh

npx --yes degit https://github.com/rjsf-team/react-jsonschema-form/packages/playground ./playground --force 
cp app.tsx ./playground/src/
cd playground
npm i --yes --force
npm i --yes --force react react-dom @codegouvfr/rjsf-dsfr
npm run build

ls