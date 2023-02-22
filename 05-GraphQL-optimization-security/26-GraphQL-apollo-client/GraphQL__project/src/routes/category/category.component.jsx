import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import { gql, useQuery, useMutation } from "@apollo/client";

import { CategoriesContext } from "../../contexts/categories.context";

import { CategoryContainer, Title } from "./category.styles";

//=============================================================================
//# example of GraphQL mutation
//=============================================================================
//! example of a mutation ofr adding a new category item
const SET_CATEGORY = gql`
  mutation ($category: Category!) {
    addCategory(category: $category) {
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

//=============================================================================
//# example of GraphQL query with a variable in an independent component
//=============================================================================

const GET_CATEGORY = gql`
  query ($title: String!) {
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
`;

//! NB here we are using GraphQL and Apollo inside of an independent component! IMPORTANT we are not using the context anymore in order to fetch this value

const Category = () => {
  //! with this variable category we have access to the title of the category
  //! and we want to use this category parameter as the variable that we pass in when we fetch for collection by title in our GraphQL query
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  //- IMPORTANT example of adding a variable to the GraphQL query: for this you need to pass a second argument to useQuery
  //- the second argument is a configuration object
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { title: category },
  });

  console.log(
    "GraphQL query (in category.component.jsx) with variable: data",
    data
  );
  console.log(
    "GraphQL query (in category.component.jsx) with variable: loading",
    loading
  );

  useEffect(() => {
    if (data) {
      //! NB nested destructuring!
      const {
        getCollectionsByTitle: { items },
      } = data;

      setProducts(items);
    }
  }, [category, data]);

  /*
  //! before adding GraphQL to query the data inside of this component
  const { categoriesMap, loading } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  */

  //! ' MUTATION ' example (just to see the syntax, we are not really using it)
  // const [ addCategory, {loading, error, data}] = useMutation(SET_CATEGORY)
  //! then you use the addCategory function (this is a mutating function)
  // addCategory({variables:{category: categoryObject}}) //! categoryObject will be a category object that we are trying to store

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Title>{category.toUpperCase()}</Title>
          <CategoryContainer>
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </CategoryContainer>
        </>
      )}
    </Fragment>
  );
};

export default Category;
