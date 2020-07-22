import fetch from "isomorphic-unfetch";
import { useQuery } from 'react-query'
import { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  Toolbar,
  Typography,
  Paper,
  Box,
  Avatar,
  Divider,
  Hidden,
  Button,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ListIcon from '@material-ui/icons/List';
import NextLink from "next/link";
import React from "react";

export interface PersonManualAPIReturn {
  numberOfRecords: number;
  manuals: Manual[];
}

export interface Manual {
  id: string;
  name: string;
  description: string;
  answerToTheMeaningOfLife: string;
  AvatarURL:string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    ManualsListPaper: {
      width: "100%",
      padding: theme.spacing(3),
    },
    ManualsList: {
      width: "250px",
    },
    MainManual: {
      padding: theme.spacing(3),
      width: "100%",
      minHeight:"500px",
    },
    MobileManualsMenu: {
      padding: theme.spacing(3),
      width: "100%",
    },
    MobileSideBar:  {
      padding: theme.spacing(3),
    }
  })
);

function getPersonManuals() {
  const apiURL = `${process.env.NEXT_PUBLIC_API}/PersonManual`;
  return fetch(`${apiURL}`).then((res) => res.json())
}

function personManuals({}) {
  const classes = useStyles();

  // React-Queries (Server Sate!)
  const PersonManualsQuery = useQuery('manuals', getPersonManuals)

  // Set up React Hooks
  const [personManualAPIReturn, setPersonManualAPIReturn] = useState<
    PersonManualAPIReturn
  >();
  const [manualIsLoading, setManualIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setMobileMenuOpen(open);
  };

  var ManualsItems;
  if (PersonManualsQuery.isLoading) {
    ManualsItems = (
      <React.Fragment>
      {[...Array(4)].map((i) => {
        return (
          <ListItem  key={i} >
              <ListItemAvatar >
                <Skeleton
                  height="45px"
                  width="45px"
                  variant="circle"
                ></Skeleton>
              </ListItemAvatar>
              <ListItemText>
                <Skeleton height="75px" />
              </ListItemText>
            <Divider light />
          </ListItem>
          
        );
      })}
      </React.Fragment>
    );
  } else if (PersonManualsQuery.isError) {
    ManualsItems = (
      <ListItem>
        We got an Error from the API. The error was {PersonManualsQuery.error.message}
      </ListItem>
    )
  } else  {
    var personManualsAPIReturn:PersonManualAPIReturn = PersonManualsQuery.data
    if (
      personManualsAPIReturn !== undefined &&
      personManualsAPIReturn.numberOfRecords > 0
    ) {
      ManualsItems = (
        <React.Fragment>
          <Typography variant="h5" color="primary" gutterBottom>Available Manuals:</Typography>
          {personManualsAPIReturn.manuals.map((manual) => {
            return (
              <React.Fragment>
              <ListItem key={manual.id} button component="a" href="#" onClick={() => getManualForPerson(`${manual.name}`)}>
              <ListItemAvatar>
                <Avatar src={manual.AvatarURL} />
              </ListItemAvatar>
                <ListItemText primary={manual.name} />
              </ListItem>
              <Divider light />
              </React.Fragment>
            );
          })}
        </React.Fragment>
      );
    } else {
      ManualsItems = (
        <React.Fragment>
          <ListItem>No Manuals from the API...</ListItem>
        </React.Fragment>
      );
  }
}

  async function getManualForPerson(name) {
    setManualIsLoading(true);
    const apiURL = `${process.env.NEXT_PUBLIC_API}/PersonManual`;

    setErrorMessage("");

    const res = await fetch(`${apiURL}?name=${name}`).catch((error) => {
      console.log("API Errored:");
      console.log(error);
      setErrorMessage(
        "We got an error trying to call the get person manual API ... Are the Azure Functions running?"
      );
    });
    if (errorMessage.length == 0) {
      if (res && res.ok) {
        let apiFuncReturn = await res.json();
        setPersonManualAPIReturn(apiFuncReturn);
        setErrorMessage("");
      } else {
        console.log("Error from the Azure Function:");
        console.log(res);
        setErrorMessage(
          "We got an error back from the get person manual Azure Function. Check the Console. "
        );
      }
    }
    setManualIsLoading(false);
  }

  // Some style sugar for our error title.
  // TODO: This should be in CSS!
  const errorStyle: React.CSSProperties = {
    color: "red",
    fontWeight: "bold",
  };

  // Work out what we should display in the Manual Card.
  var CardReturn;
  if (manualIsLoading) {
    CardReturn = <p>Loading....</p>;
  } else if (errorMessage.length > 0) {
    CardReturn = (
      <div>
        <p style={errorStyle}>Error:</p>
        <p>{errorMessage}</p>
      </div>
    );
  } else if (
    personManualAPIReturn !== undefined &&
    personManualAPIReturn.numberOfRecords == 1
  ) {
    CardReturn = personManualAPIReturn.manuals.map((manual) => {
      return (
        <div className="card-big">
          <h1>{manual.name}</h1>
          <p className="description">{manual.description}</p>
        </div>
      );
    });
  } else {
    CardReturn = <div>Please Select a user on the left hand side.</div>;
  }

  const ManualsList = () => (
      <List className={classes.ManualsList}>
        {ManualsItems}
      </List>
    );

  // Return the whole page setup.
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item container>

        <Hidden mdUp>
          <Paper className={classes.MobileManualsMenu}>
            <Button variant="outlined" onClick={toggleDrawer(true)} startIcon={<ListIcon />}>Select Manual</Button>
            <SwipeableDrawer
              anchor="left"
              open={mobileMenuOpen}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              
              <Box className={classes.MobileSideBar}>
                <ManualsList />
              </Box>
            </SwipeableDrawer>
          </Paper>
        </Hidden>
      </Grid>
      <Grid item container direction="row" spacing={3}>
        <Grid xs={false} sm={2} item>
          <Hidden smDown>
            <Paper className={classes.ManualsListPaper} elevation={5}>
              <ManualsList />
            </Paper>
          </Hidden>
          {/* Manuals List */}
        </Grid>
        <Grid
          xs={12}
          sm={8}
          item
          container
          direction="row"
          // className={classes.root}
        >
          <Paper elevation={5} className={classes.MainManual}>
            <NextLink href="/" passHref>
              <Button
                variant="outlined"
                color="default"
                startIcon={<ArrowBackIcon />}
                size="medium"
                style={{ marginBottom: "20px" }}
              >
                Back to index
              </Button>
            </NextLink>
            {/* Manual Big Card */}
            <Box height="100%" width="100%" display="flex" alignItems="center">
              <Skeleton component="div" width="100%" height="100%"></Skeleton>
            </Box>
          </Paper>
        </Grid>
        <Grid xs={false} sm={2} item className="Gutter"></Grid>
      </Grid>
    </Grid>

    // <div className="project">
    //   <aside>
    //     <h3>Testing!!...</h3>
    //     {leftNavItems}
    //   </aside>
    //   <main>{CardReturn}</main>
    // </div>
  );
}

// // This is just a bit of example code used to test if the NEXT_PUBLIC_API
// // environment variable can be seen both on server and client side.
// export async function getStaticProps() {
//   // Do our server side code
//   console.log("API address Server:")
//   console.log(process.env.NEXT_PUBLIC_API);
//
//   // Continue the page load!
//   return {props:{}}
// };

export default personManuals;
