#!/usr/bin/env bash
set -euo pipefail
npm install -g eas-cli
eas login
for app in buyer seller admin; do
  echo "Building $app APK"
  (cd "apps/$app" && eas build --platform android --profile preview)
done

