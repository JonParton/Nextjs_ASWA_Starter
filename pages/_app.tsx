import React from "react";
import "../styles/reset.css";
import "../styles/main.css";

import { CssBaseline, Grid, makeStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";

const useStyles = makeStyles((theme) => ({
  mainContent: {
    marginTop: theme.spacing(3),
  },
}));

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const classes = useStyles();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <div>
      <CssBaseline />
      <Grid container direction="column">
        <Grid item>
          <NavBar />
        </Grid>
        <Grid item className={classes.mainContent}>
          <Component {...pageProps} />
        </Grid>
      </Grid>
    </div>
  );
}
