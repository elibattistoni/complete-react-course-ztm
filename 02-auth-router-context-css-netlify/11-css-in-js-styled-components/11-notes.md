Very frequently when we write CSS and Sass, we forget the naming and the nomenclature of these components, so it is easy to accidentally write the same class names for specific elements that you might have forgotten.

In addition, if you are very diligent with your strategy, it is very easy to find these clashes.

CSS-in-JS allows us to scope our styling exclusively to components, and this allows us to never have to worry about clashing styles.

# Installing Styled Components
>>> yarn add styled-components

styeled components is just one flavor of CSS in JS (there is another one called emotion style, but that has almost the exact same structure as styled components)

here in our project we want to replace all our css and sass styling with styled components

NB in order for you to transform a sass file into styled components, the firsth thing we need to do is switch from sass to js or jsx (change the file extension)

NB project fully converted to styled components https://github.com/ZhangMYihua/crwn-clothing-v2/tree/lesson-23