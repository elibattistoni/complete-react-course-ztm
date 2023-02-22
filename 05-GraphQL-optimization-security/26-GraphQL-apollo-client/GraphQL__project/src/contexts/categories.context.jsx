import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

//! NB now, instead of making the request to firebase, we now have our own separate server that is hosting our data
//! so you have to import these things from the Apollo client:
import { gql, useQuery } from "@apollo/client";
//! NB GQL is what allows us to write the same query signatures that we wrote inside of the GraphQL playground
//! and you use useQuery when you want to make a query

//! let's define the shape of the object for the GraphQL query
//! NB collections is the name of the query / the table
//! inside of collections you define the fields, like you did in the playground
const COLLECTIONS = gql`
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
`;
//! now we have to use this inside of the provider

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  //! pass the COLLECTIONS query that you defined above to the useQuery hook
  const { loading, error, data } = useQuery(COLLECTIONS);
  //! this is what useQuery gives us:
  //! loading ==> a boolean that tells us whether it is being loaded
  //! error ==> an error, in case you have an error
  //! data
  console.log("GraphQl query (in categories.context.jsx) - data", data);
  console.log("GraphQl query (in categories.context.jsx) - loading", loading);

  //! transform the data with an effect: run this effect only when data updates
  useEffect(() => {
    if (data) {
      const { collections } = data;
      const collectionsMap = collections.reduce((acc, collection) => {
        const { title, items } = collection;
        acc[title.toLowerCase()] = items;
        return acc;
      }, {});
      //! update the state
      setCategoriesMap(collectionsMap);
    }
  }, [data]);

  //! code related to firebase:
  /*
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);
  */

  const value = { categoriesMap, loading }; //! categoriesMap (the state) gets passed as a value into our context, alongside the loading state
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
