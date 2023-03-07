import styled from "styled-components";
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "../button/button.styles";

//! NB with button ... you are targeting only buttons that are children of CartDropDownContainer
//! but instead of a normal button html element, you want to target your own custom Button component
//! (which is conditionally rendered depending on the buttonType passed in as prop)
export const CartDropDownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
  }
`;
//_ therefore if any of these 3 components (BaseButton,...) gets nested inside of CartDropDownContainer,
//_ then make sure to apply these styles to them (i.e. margin-top: auto)

//! if inside of the EmptyMessage component you want to target your CartDropDownContainer, you can this:
//! here you want to style the CartDropDownContainer component when it is a child of the EmptyMessage component
//! IMPORTANT in this way you can overwrite and make nested styles
export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;
//   ${CartDropDownContainer} {}

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
