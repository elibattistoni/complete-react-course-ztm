import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      {/*
      //! NB NavigationContainer is our styled component!
      //! if you look in the dev tools, the class name that is generated is an uniquely generated class name
      //! this style gets generated on build, so that when we work with styled components, there are no clashes
      //! NB styled component ensures that every one of these components that we write, has a unique class name
      */}
      <NavigationContainer>
        {/*
        //! LogoContainer is a styled Link component (from react router) and
        //! this LogoContainer component will forward all the props to the underlying Link component, so it will behave like a Link component
        */}
        <LogoContainer to="/">
          <CrwnLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            //! IMPORTANT styled components gives us unique props that can fit into any component generated with styled
            //! they allow us to pass in an "as" prop with a string value that
            //! indicates what component or base HTML element we want this to be rendered as
            //! in this case we want to render this as a span, not as a Link
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
