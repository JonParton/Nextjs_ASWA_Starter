import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import NextLink from "next/link";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textTransform: "none",
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NextLink href="/" passHref>
            <Button color="inherit" component="a" className={classes.title}>
              <Typography variant="h6" className={classes.title}>
                Next.js ASWS Example
              </Typography>
            </Button>
          </NextLink>
          <Button component="span" startIcon={<GitHubIcon />} color="inherit">
            <Box display={{ xs: "none", sm: "block" }}>
              <Typography variant="h6" className={classes.title}>
                See it on GitHub
              </Typography>
            </Box>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
