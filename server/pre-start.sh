#!/bin/bash
echo "performing migration"
# npm db:migrate
sequelize db:migrate --migrations-path src/migrations --config src/config/index.js --env production
sequelize db:seed:all --seeders-path src/seeders --config src/config/index.js
npm run start