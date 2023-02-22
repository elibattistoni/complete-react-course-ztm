import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { UserProvider } from "./contexts/user.context";
import { CategoriesProvider } from "./contexts/categories.context";
import { CartProvider } from "./contexts/cart.context";

import "./index.scss";

//! in order to work with GraphQL, we need to wrap the application in some kind of GraphQL provider
//! but instead of a GraphQL provider, it is going to be an Apollo provider
//! NB the Apollo client is going to be the thing that registers the actual GraphQL server that you are trying to hit
//! so we need these things:
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

//! initialize the client:
const client = new ApolloClient({
  //! uri points to the URL of the server
  //! in our case, the server is going to be our GraphQL playground, which is also our server's entry point (they serve double duty)
  uri: "https://crwn-clothing.com/",

  //! what does caching do? when you make a request with GraphQL, that request comes back and GraphQL will actually cache that value as well
  //! so if you make the same request again, if nothing is changed, then GraphQL will just give you the cached value
  //! and this is very handy because there is a local copy of the data you have asked for --> this is the big thing that you can dow ith Apollo
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById("root");

//! you want to wrap the highest part of your application with the ApolloProvider with the client prop set to the created client
//! and now you can utilize GraphQL inside of your application
//! NB go to the categories.context.jsx because it is there where we actually fetch our data
render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  rootElement
);

/*
! IMPORTANT how to use a different query where you can pass it a variable inside of our code
! inside of our application there is a chance that we do not actually have the ID
! what we have is a URL parameter that contains the sctual title that we can also query by
! in the playground there is a method getCollectionsByTitle
*/

/*
>> NB IMPORTANT with GraphQL and Apollo you replace Redux --> why? look at the fetch requests in the Network tab of the dev tools
>> NB there is caching that is happening under the hood!
>> if you navigate away, and go back to the page which uses the GraphQL data that you have previously gotten through the query, you will see that only the images are re-fetched
>> it does not make another call to the Crown Clothing GraphQL server --> why? because this query for this page has already been cached (GraphQL and Apollo know that we do not need to refetch this)
>> and why it does not need to re-fetch this? because the variables in the query have not hanged --> for more info cfr lecture 235
>> the caching happens at the query level, not at the item level!! NB Apollo caches the query, not the actual items themselves
*/

/*
' MUTATIONS '
! https://www.apollographql.com/docs/react/data/mutations/
! we are not going to perform actual mutations, but look at category.component.jsx
*/
