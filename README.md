# Informations sur le projet

C'est un projet personnel pour monter en competences sur :

- React, Nextjs, React-hook-form, TailwindCss, Zustand, Prisma.

Le but de projet est de faire un management de startup. Sur site, il sera possible de faire :

- Pouvoir se connecter, modifier son profil
- Pour les utilisateurs connectés :
  - Ajouter, modifier, lire et supprimer une startup
  - Exporter les startups en .csv, pdf
  - Voir la localisation des startups sur une maps
  - Pouvoir ajouter des pieces jointes aux startups
  - Pouvoir ajouter un commentaire sur une startup

Pour démarrer le projet, il faut :

- Cloner le projet
- Télécharger les dépendances

```bash
npm install
```

- Faire une copie du .env en .env.local
- Remplir les constantes du fichier .env.local
  - Pour générer la valeur de NEXTAUTH_SECRET, vous pouvez utiliser cette commande :
  ```bash
  openssl rand -base64 16
  ```
- Lancer la génération des modeles Prisma

```bash
npx prisma generate
```

- Lancer la migration de la base de donées

```bash
npm run db:push
```

- Lancer le serveur

```bash
npm run dev
```

- Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat
