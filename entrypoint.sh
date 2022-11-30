#!/bin/sh
# This script replaces system variable during container start up, 
# Due to nextjs doesn't support setting client side variable (NEXT_PUBLIC_ variables) from docker system env,
# this script replaces any variable that matched placeholder pattern.
# Referenced from https://dev.to/itsrennyman/manage-nextpublic-environment-variables-at-runtime-with-docker-53dl


echo "[Preload] Replacing enviorment variables."
test -n "$NEXT_PUBLIC_BACKEND"

find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_BACKEND_URL#$NEXT_PUBLIC_BACKEND_URL#g"

echo "[Preload] Replace complete, Starting Nextjs."
exec "$@"