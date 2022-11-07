# Backend  

-----------------
## Commencer  
###
1. Installer les dépendences  
````shell
$ npm install
````  
2. Mettre en place le fichier .env à la racine

↓ Contenu du fichier .env ↓
````.env
SERVER_PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=Groupomania
DB_USER= ICI VOTRE USER
DB_PASSWORD= ICI VOTRE PASSWORD

BCRYPT_SALT_ROUND=RANDOM_TOKEN_SECRET
JWT_SECRET=RANDOM_TOKEN_SECRET
JWT_DURING=1h
````
3. Lancer le serveur à l'aide de la commande " start " du package.json ou ↓
````shell
$ node -r dotenv/config server.js
````
4. Le serveur est lancée sur: http://localhost:3000/
-----------------

## Rendez-vous dans le dossier 'database'
