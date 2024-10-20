# Composant Carousel Vue

Ce composant est un carousel flexible et personnalisable. Il permet de créer un slider avec des options telles que le défilement automatique, l'effet de boucle, le contrôle via les touches du clavier, et bien plus encore.

## Installation

Pour utiliser ce composant, vous devez l'importer et l'enregistrer dans votre composant parent.

```vue
<script setup>
import Carousel from "path/to/Carousel.vue";
</script>

<template>
  <Carousel :slides="slides" :model-value="0" wrap-around auto-play>
    <template #slide="{ s }">
      <div>
        <h3>{{ s.title }}</h3>
        <p>{{ s.description }}</p>
      </div>
    </template>
  </Carousel>
</template>
```

## Props

| Prop                   | Type    | Défaut  | Description                                                                    |
| ---------------------- | ------- | ------- | ------------------------------------------------------------------------------ |
| `modelValue`           | Number  | `0`     | Position par défaut du carousel.                                               |
| `slides`               | Array   | `[]`    | Les slides à afficher dans le carousel.                                        |
| `wrapAround`           | Boolean | `false` | Active ou non l'effet de boucle.                                               |
| `transitionDuration`   | Number  | `300`   | Durée de la transition en millisecondes.                                       |
| `autoPlay`             | Boolean | `false` | Active ou non le défilement automatique.                                       |
| `autoPlayInterval`     | Number  | `5000`  | Intervalle de temps entre chaque slide en millisecondes.                       |
| `pauseAutoPlayOnHover` | Boolean | `true`  | Met en pause le défilement automatique lorsque le curseur survole le carousel. |
| `arrowKeys`            | Boolean | `true`  | Active ou non la navigation avec les flèches.                                  |
| `touchDrag`            | Boolean | `true`  | Active ou non la navigation tactile.                                           |

### Propriétés à venir

Les propriétés suivantes seront bientôt disponibles :

- `itemsToShow` : Nombre de slides à afficher en même temps.
- `itemsToScroll` : Nombre de slides à scroller à chaque transition.

## Slots

Le composant propose plusieurs slots pour personnaliser l'affichage :

- **slide** : Pour personnaliser l'apparence de chaque slide.
- **addons** : Permet d'ajouter des éléments supplémentaires (comme des indicateurs de pagination) sous le carousel.

## Méthodes

| Méthode                                       | Description                   |
| --------------------------------------------- | ----------------------------- |
| `next()`                                      | Passe à la slide suivante.    |
| `prev()`                                      | Passe à la slide précédente.  |
| `slideTo(index: number, transition: boolean)` | Passe à une slide spécifique. |

## Exemples d'utilisation

### Exemple simple

```vue
<Carousel :slides="slides" :model-value="0">
  <template #slide="{ s }">
    <div>
      <h3>{{ s.title }}</h3>
      <p>{{ s.description }}</p>
    </div>
  </template>
</Carousel>
```

### Avec autoplay et wrap-around

```vue
<Carousel :slides="slides" auto-play wrap-around :auto-play-interval="3000">
  <template #slide="{ s }">
    <div>
      <h3>{{ s.title }}</h3>
      <p>{{ s.description }}</p>
    </div>
  </template>
</Carousel>
```

### Avec indicateurs de pagination personnalisés

```vue
<Carousel :slides="slides" wrap-around>
  <template #slide="{ s }">
    <div>
      <h3>{{ s.title }}</h3>
      <p>{{ s.description }}</p>
    </div>
  </template>
  <template #addons>
    <div class="pagination">
      <!-- Indicateurs de pagination -->
    </div>
  </template>
</Carousel>
```

## Remarques

Les options `itemsToShow` et `itemsToScroll` seront bientôt disponibles pour offrir plus de flexibilité dans l'affichage et le défilement des slides.

N'hésitez pas à adapter le composant à vos besoins en personnalisant les slots ou en ajoutant des styles CSS pour une meilleure intégration dans votre application.
