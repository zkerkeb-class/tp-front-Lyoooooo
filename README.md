# TP1

# lien vers la vidéo : https://youtu.be/zSXCRY4b5LE

## Fonctionnalites de l'application

### Fonctionnalites principales

- Affichage d'une liste de Pokemons avec pagination (20 par page)
- Recherche de Pokemons par nom
- Affichage des details d'un Pokemon sur une page specifique
- Modification des informations d'un Pokemon
- Suppression d'un Pokemon avec confirmation
- Creation de nouveaux Pokemons

### Fonctionnalité au choix

- Lecture du son/cri du Pokemon

### Details des fonctionnalites

#### Liste et Pagination
L'application affiche les Pokemons par groupe de 20. L'utilisateur peut naviguer entre les pages avec les boutons precedent et suivant. Le numero de la page actuelle et le nombre total de pages sont affiches.

#### Recherche
Une barre de recherche en haut de la page permet de chercher un Pokemon par son nom en anglais ou en francais. Les resultats s'affichent immediatement sans charger une nouvelle page.

#### Page de detail
En cliquant sur un Pokemon, l'utilisateur accede a une page avec toutes les informations : nom en plusieurs langues, types, stats complete avec barres de progression, et image.

#### Modification
Sur la page de detail, un bouton permet d'editer : le nom anglais, le nom francais, et toutes les stats du Pokemon. Les modifications sont sauvegardees en base de donnees.

#### Suppression
Un bouton permet de supprimer le Pokemon. Une fenetre de confirmation s'affiche pour eviter les suppressions accidentelles.

#### Creation
Une page dedie permet de creer un nouveau Pokemon en remplissant un formulaire avec : nom en plusieurs langues, types (jusqu'a 2), stats de base, et URL de l'image.

#### Son du Pokemon
Sur la page de detail, un bouton permet d'ecouter le cri officiel du Pokemon desde la base de donnees PokéAPI.