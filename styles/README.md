# Static Styles

This folder is for storing CSS/SASS/LESS files that can be linked in to the application.

This is useful for transferring in static web pages you have crafted in HTML and CSS previously.

You can see the main.css file being imported in at the top of [\_app.tsx](../pages/_app.tsx).

However in the component world of React I personally thing using JSS in the component files is a better idea for portability and having all your code in one place! Examples of this can be seen in many pages of this example using the `useStyles` Hook and `makeStyles` then including the rules on an element bu setting its class name through className.

```jsx
<Paper elevation={10} className={classes.paper}>
```
