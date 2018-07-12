#!/bin/sh

npm run build
rm -rf ../osa7_backend/build
cp -r build ../osa7_backend

chmod u+x deploy.sh
