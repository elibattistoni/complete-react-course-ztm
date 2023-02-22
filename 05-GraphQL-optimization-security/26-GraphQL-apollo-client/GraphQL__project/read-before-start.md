# Install the dependencies

First of all, install the dependencies in package.json:
$ yarn install

Then install the Apollo client dependency and the GraphQL dependency

$ yarn add @apollo/client graphql

NB Apollo is the frontend client that allows us to make requests for GraphQL and receive responses from GraphQL. And it comes with a bunch of bindings for React so that we can actually get GraphQL data and make GraphQL requests within our components.

IMPORTANT the code related to GraphQL is in index.js and categories.context.js

# GraphQL playground
ZTM made a GraphQL playground which you can find here: https://crwn-clothing.com/

A GraphQL playground is a place where you can make queries in the GraphQL language directly against the database or the GraphQL server that's connected to the database. GraphQL sits between the database and the server, and what it does is it allows you to format your requests in the manner that we discussed in the previous video where we pass it some object that looks roughly like the data you want.



IMPORTANT there are mainly 2 different things that you can do inside of GraphQL:
- QUERY = a request for data
- MUTATION = a request to modify or add data or delete data


SCHEMA --> the schema represents everything that you can make inside of GraphQL:
- we have queries, and queries define the different types of requests you can ask for (NB the name of what you are asking for is defined by the person who wrote the server)

# in the GraphQL playground: to get back a list of collections
```
query {
  collections {
    id
    title
    items {
      id
      name
      price
      imageUrl
    }
  }
}

```

# GraphQL playground: queries with variables:
in the query editor:

```
query($id: ID!) {
  collection(id: $id) {
    id
    title
    items {
      id
      name
      price
      imageUrl
    }
  }
}

```
in the query variables:

```
{"id": "cjwuuj5bz000i0719rrtw5gqk"}

```

because remember that the schema is:

```
#
type Query {
  #
  collections: [Collection!]!

  #
  collection(id: ID!): Collection

  #
  getCollectionsByTitle(title: String): Collection
}

#
type Collection {
  #
  id: ID!

  #
  title: String!

  #
  items: [Item!]!
}

#
type Item {
  #
  id: ID!

  #
  name: String!

  #
  price: Float!

  #
  imageUrl: String!

  #
  collection: Collection
}

```

# GraphQL playground: you can make multiple requests!

```
# Write your query or mutation here
query($id: ID!) {
  collection(id: $id) {
    id
    title
    items {
      id
      name
      price
      imageUrl
    }
  } 
  collections {
    id
    title
  }
}

```

# Query with variable
query($title: String!) {
  getCollectionsByTitle(title: $title) {
    id
    title
    items {
      id
      name
      price
      imageUrl
    }
  } 
}


# run
NB NB after adjusting the code, go inside the folder
05-GraphQL-optimization-security/26-GraphQL-apollo-client/00-crwn-clothing-playground$ yarn start

