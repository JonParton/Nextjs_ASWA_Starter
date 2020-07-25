import { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  Theme,
  createStyles,
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
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { Skeleton, Alert } from "@material-ui/lab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BackspaceIcon from "@material-ui/icons/Backspace";
import ListIcon from "@material-ui/icons/List";
import NextLink from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { currentManualNameState } from "../state/atoms";
import { useRecoilState } from "recoil";
import { usePersonManuals, usePersonManual } from "../state/ReactQueryHooks";
import { useSnackbar } from "notistack";
import { ReactQueryDevtools } from "react-query-devtools";
import { ReactQueryStatusLabel } from "../components/ReactQueryStatusLabel";

export interface PersonManualAPIReturn {
  numberOfRecords: number;
  manuals: Manual[];
}

export interface Manual {
  id: string;
  name: string;
  description: string;
  answerToTheMeaningOfLife: string;
  AvatarURL: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    flexGrow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    ManualsListPaper: {
      width: "100%",
      minWidth:"250px",
      height: "100%",
      padding: theme.spacing(3),
      overflowY: "auto",
    },
    ManualsList: {
      width: "250px",
    },
    MainManual: {
      padding: theme.spacing(3),
      width: "100%",
      height: "100%",
    },
    MobileManualsMenuContainer: {
      marginTop: -theme.spacing(3),
    },
    MobileManualsMenu: {
      padding: theme.spacing(3),
      width: "100%",
    },
    MobileSideBar: {
      padding: theme.spacing(3),
    },
    errorStyle: {
      color: "red",
      fontWeight: "bold",
    },
    manualCardRoot: {
      maxWidth: "500px",
      width: "100%",
      display:"flex",
      flexDirection:"column",
      alignContent:"center",
      alignSelf:"center",
    },
    cardMedia: {
      height: 300,
      width:300,
      alignSelf:"center",
    },
    alertRoot:  {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

function personManuals({}) {
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [currentManualName, setCurrentManualName] = useRecoilState(
    currentManualNameState
  );

  // On load or when the Query string changes make sure we set our states.
  useEffect(() => {
    if (router.query && router.query.manual) {
      let manualString: string = router.query.manual as string;
      setCurrentManualName(manualString);
    } else {
      setCurrentManualName("");
    }
  }, [router]);

  // React-Queries (Server Sate!)
  const PersonManualsQuery = usePersonManuals();

  // Set up React Hooks
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
        {[1, 2, 3, 4].map((i) => {
          return (
            <ListItem key={i}>
              <ListItemAvatar>
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
      <ListItem key="Error">
        We got an Error from the API. The error was{" "}
        {PersonManualsQuery.error.message}
      </ListItem>
    );
  } else {
    var personManualsAPIReturn: PersonManualAPIReturn = PersonManualsQuery.data;
    if (
      personManualsAPIReturn !== undefined &&
      personManualsAPIReturn.numberOfRecords > 0
    ) {
      ManualsItems = (
        <React.Fragment>
          <Typography key="title" variant="h5" color="primary" gutterBottom>
            Available Manuals:
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<BackspaceIcon />}
            onClick={() => {
              router.push(`/personManuals`, undefined, { shallow: true });
              enqueueSnackbar("Returned to explanation", { variant: "info" });
              setMobileMenuOpen(false);
            }}
            disabled={currentManualName.length == 0 ? true : false}
            style={{marginBottom:"10px"}}
          >
            Clear Selection
          </Button>
          {personManualsAPIReturn.manuals.map((manual) => {
            return (
              <React.Fragment key={manual.id}>
                <ListItem
                  button
                  component="a"
                  href="#"
                  onClick={() => {
                    router.push(
                      `/personManuals?manual=${manual.name}`,
                      undefined,
                      { shallow: true }
                    );
                    setMobileMenuOpen(false);
                  }}
                  selected={manual.name == currentManualName ? true : false}
                  divider
                >
                  <ListItemAvatar>
                    <Avatar src={manual.AvatarURL} />
                  </ListItemAvatar>
                  <ListItemText primary={manual.name} />
                </ListItem>
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
  
  const personManualQuery = usePersonManual(currentManualName);

  // Work out what we should display in the Manual Card.
  var CardReturn;
  if (currentManualName.length == 0) {
    CardReturn = (
      <Box>
        <Typography variant="h4" gutterBottom>
          Server Rendered Frame, Client Rendered Content
        </Typography>
        <Typography variant="body1" paragraph>
          This page has loaded with a server rendered frame but it will
          dynamically load in data when you ask it to.{" "}
        </Typography>
        <Typography variant="body1" paragraph>
          In fact it has probably already loaded a menu with available manuals
          person manuals to view.{" "}
        </Typography>
        <Typography variant="body1" paragraph>
          Select one of them from the menu to see CSR in action.{" "}
        </Typography>
      </Box>
    );
  } else if (personManualQuery.isLoading) {
    CardReturn = (
      // <Skeleton component="div" width="100%" height="100%"></Skeleton>
      <Box
        width="100%"
        justifyContent="center"
        alignContent="flex-start"
        display="flex"
        flexDirection="column"
      >
        <ReactQueryStatusLabel style={{width:"fit-content",alignSelf:"center",marginBottom:"10px"}} queryKey={["manual", currentManualName]}/>
        <Card
          className={classes.manualCardRoot}
          variant="outlined"
          elevation={8}
        >
          <Box
            width="100%"
            justifyContent="center"
            display="flex"
            paddingTop="28px"
          >
            <Skeleton height={200} width={200} variant="circle">
            </Skeleton>
          </Box>
          <CardContent>
            <Typography variant="h5" component="h2">
              <Skeleton width={80} />
            </Typography>
            <Typography color="textSecondary">
              <Skeleton width={160} />
            </Typography>
            <Typography variant="body2" component="p">
              <Skeleton width={"100%"} />
              <Skeleton width={"100%"} />
              <Skeleton width={"60%"} />
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  } else if (personManualQuery.isError) {
    CardReturn = (
      <Box>
        <ReactQueryStatusLabel style={{width:"fit-content",alignSelf:"center",marginBottom:"10px"}} queryKey={["manual", currentManualName]}/>
        <Typography variant="h4" className={classes.errorStyle} gutterBottom>
          Error:
        </Typography>
        <Typography variant="body1" paragraph>
          {personManualQuery.error.message}
        </Typography>
        <Typography variant="body1" paragraph>
          If this is happening locally, did you start the azure functions?
        </Typography>
      </Box>
    );
  } else if (
    personManualQuery.data !== undefined &&
    personManualQuery.data.numberOfRecords == 1
  ) {
    CardReturn = (
      <Box
        className={classes.alertRoot}
        display="flex"
        flexDirection="column">
        <Alert severity="info">In loading this manual we also did a shallow navigation to include the manual name in the URL. This means the URL could be copied and shared!</Alert>
        <Alert severity="warning">I haven't found a way to do this with CSR to clean up the url to be just a /[manual]</Alert>
      <Box
        width="100%"
        justifyContent="center"
        alignContent="flex-start"
        display="flex"
        flexDirection="column"
      >
        <ReactQueryStatusLabel style={{width:"fit-content",alignSelf:"center",marginBottom:"10px"}} queryKey={["manual", currentManualName]}/>
        {personManualQuery.data.manuals.map((manual: Manual) => {
          return (
            <Card
              className={classes.manualCardRoot}
              variant="outlined"
              elevation={8}
              key={manual.id}
            >
              <CardMedia
                className={classes.cardMedia}
                image={manual.AvatarURL}
                title={`${manual.name}'s Avatar`}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {manual.name}
                </Typography>
                <Typography color="textSecondary">
                  Answer to the meaning of life:{" "}
                  {manual.answerToTheMeaningOfLife}
                </Typography>
                <Typography variant="body2" component="p">
                  {manual.description}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
      </Box>
    );
  } else {
    CardReturn = <div>Please Select a manual on the left hand side.</div>;
  }

  const ManualsList = () => (
    <List className={classes.ManualsList}>{ManualsItems}</List>
  );

  const BackButton = () => (
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
  );

  const SelectManualsButton = () => (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      onClick={toggleDrawer(true)}
      startIcon={<ListIcon />}
      style={{ marginBottom: "20px"}}
    >
      Select Manual
    </Button>
  );

  // Return the whole page setup.
  return (
    <Grid container direction="column" className={classes.root} style={{padding:"12px"}}>
      <Hidden lgUp>
        <Grid item container className={classes.MobileManualsMenuContainer}>
          <Paper className={classes.MobileManualsMenu}>
            <Box display="flex" flexDirection="row" justifyContent="flex-start">
              <BackButton />
            </Box>
            <SwipeableDrawer
              anchor="left"
              open={mobileMenuOpen}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              <Box className={classes.MobileSideBar}>
                <ManualsList />
                <ReactQueryStatusLabel style={{alignSelf:"flex-end",width:"fit-content",maxWidth:"200px",marginTop:"20px"}} queryKey={["manuals"]}/>

              </Box>
            </SwipeableDrawer>
          </Paper>
        </Grid>
      </Hidden>
      <Grid
        item
        container
        direction="row"
        className={classes.flexGrow}
        spacing={1}
      >
        <Hidden mdDown>
          <Grid md={false} lg={2} item>
            <Paper className={classes.ManualsListPaper} elevation={5}>
              <ManualsList />
              <ReactQueryStatusLabel style={{alignSelf:"flex-end",width:"fit-content",maxWidth:"230px",marginTop:"20px"}} queryKey={["manuals"]}/>
            </Paper>
          </Grid>
        </Hidden>
        <Grid
          md={12}
          lg={8}
          item
          container
          direction="row"
          className={classes.flexGrow}
        >
          <Paper elevation={5} className={classes.MainManual}>
            <Hidden lgUp>
              <SelectManualsButton /> 
            </Hidden>

            <Hidden mdDown>
              <BackButton />
            </Hidden>

            <Box
              height="100%"
              width="100%"
              display="flex"
              alignItems="flex-start"
            >
              {CardReturn}
            </Box>
          </Paper>
        </Grid>
        <Grid md={false} lg={2} item className="Gutter"></Grid>
      </Grid>
      <ReactQueryDevtools />
    </Grid>
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
