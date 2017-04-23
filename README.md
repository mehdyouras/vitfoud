# vitfoud (client)

> Client code for vitfoud project.

* * *

**Note:** the school where the course is given, the [HEPL](http://www.provincedeliege.be/hauteecole) from Liège, Belgium, is a french-speaking school. From this point, the instructions will be in french. Sorry.

* * *

Le présent repo contient le code _front_ de base du projet **vitfoud**.

Il va de paire avec une API REST dont le code source est accessible sur le repo [hepl-ria/vitfoud](https://github.com/hepl-ria/vitfoud).  
Toutes les instructions pour accéder au serveur sur lequel tourne le code vous seront données en classe.

## Contenu

Le code est prévu pour fonctionner de manière statique (le serveur est distant et sera commun à tous les élèves).

De la même manière que pour les projets abordés en cours, le code est organisé dans le dossier `src`, qui contient lui-même trois sous-dossiers.

Le code est _compilé_ via *Gulp*.

### Installation

> *Note:* pour la suite de cet énoncé, nous assumons que vous avez installé *node.js*, *gulp* et *yarn* sur votre machine.

Comme d'habitude, vous devez installer les dépendances du projet.

	$ yarn install

### Tâches Gulp

Le projet est fourni avec un gulpfile déjà complété, contenant trois tâches et deux alias.

* La tâche `gulp html` compile l'unique fichier *pug* en *html*.
* La tâche `gulp css` compile vos fichiers *scss* en *css minifié & autopréfixé*.
* La tâche `gulp js` compile les fichiers *js* vers deux fichiers séparés, pour les librairies et le code applicatif.
* L'alias `gulp work` lance une compilation & observe vos fichiers, prêt à les recompiler à chaque changement.
* L'alias `gulp` (tâche par défaut), lance une compilation complète des fichiers pug, css et js.

## Énoncé

Toutes les consignes concernant ce travail vous seront données en classe.