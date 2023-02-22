
# Pokemon Playground
Pokemon sprites (images):
```
query MyQuery {
  pokemon_v2_pokemonsprites {
    pokemon_id
    sprites
    id
  }
}
```
----------------------
query MyQuery {
  pokemon_v2_pokemonsprites {
    pokemon_id
    sprites
    id
  }
  pokemon_v2_pokemon {
    id
    height
    name
    base_experience
    pokemon_species_id
  }
  pokemon_v2_pokemonspecies(distinct_on: id) {
    name
    id
    pokemon_v2_generation {
      name
      id
    }
  }
  pokemon_v2_pokemonstat(distinct_on: pokemon_id) {
    pokemon_id
    base_stat
    effort
    pokemon_v2_pokemon {
      name
    }
  }
  pokemon_v2_pokemontype {
    id
    pokemon_id
    pokemon_v2_type {
      name
    }
  }
  pokemon_v2_move {
    name
    id
  }
  pokemon_v2_ability {
    name
    id
    pokemon_v2_pokemonabilities(distinct_on: pokemon_id) {
      pokemon_id
      ability_id
    }
  }
}

----------------------------------

