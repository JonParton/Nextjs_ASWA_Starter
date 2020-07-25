import React from "react";
import "../styles/reset.css";
import "../styles/main.css";
import { RecoilRoot } from "recoil";
import { CssBaseline, Grid as Box, makeStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";
import { SnackbarProvider } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    display:"flex",
    flexDirection:"column",
    height:"100%",
  },
  mainContent: {
    marginTop: theme.spacing(3),
    flexGrow:1,
    display:"flex"
  },
}));

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const classes = useStyles();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <RecoilRoot>
      <SnackbarProvider maxSnack={2} autoHideDuration={1000} anchorOrigin={{horizontal:"right", vertical:"bottom"}}>
        <CssBaseline />
        <Box className={classes.root}>
          <Box>
            <NavBar />
          </Box>
          <Box className={classes.mainContent}>
            <Component {...pageProps} />
          </Box>
        </Box>
      </SnackbarProvider>
    </RecoilRoot>
  );
}
