#!/bin/bash
echo "performing migration"
# npm db:migrate
sequelize db:migrate --migrations-path src/migrations --config src/config/index.js --env production
npm run start