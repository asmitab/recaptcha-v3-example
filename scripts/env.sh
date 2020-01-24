#!/bin/sh

if [ -z ${SITE_KEY} ] || [ -z ${API_ENDPOINT} ];
then
  echo 'SITE_KEY & API_ENDPOINT must be defined';
  exit 1;
fi

echo "Writing to file public/env.js"
echo "env = {" >> public/env.js
echo "  SITE_KEY: '$SITE_KEY'," >> public/env.js
echo "  API_ENDPOINT: '$API_ENDPOINT'" >> public/env.js
echo "}" >> public/env.js
