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
  Link,
} from "@material-ui/core";
import { Skeleton, Alert } from "@material-ui/lab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BackspaceIcon from "@material-ui/icons/Backspace";
import ListIcon from "@material-ui/icons/List";
import NextLink from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { currentManualNameState, currentPageTitleState } from "../state/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
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
      minWidth: "250px",
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
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
      alignSelf: "center",
    },
    cardMedia: {
      height: 300,
      width: 300,
      alignSelf: "center",
    },
    alertRoot: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    imageBanner: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      "& > img": {
        minWidth: "150px",
        maxWidth: "400px",
        width: "30%",
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
  const setCurrentPageTitle = useSetRecoilState(currentPageTitleState);

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
        {[1, 2, 3, 4, 5, 6].map((i) => {
          return (
            <ListItem key={i}>
              <ListItemAvatar>
                <Skeleton
                  height="30px"
                  width="30px"
                  variant="circle"
                ></Skeleton>
              </ListItemAvatar>
              <ListItemText>
                <Skeleton height="30px" />
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
            style={{ marginBottom: "10px" }}
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
    setCurrentPageTitle(`CSR Example`);
    CardReturn = (
      <Box>
        <Typography variant="h4" gutterBottom>
          Server Rendered Frame, Client Rendered Content
        </Typography>

        <Box className={classes.imageBanner}>
          <img src="/images/undraw_next_js_8g5m.png" />
          <Typography variant="h2" color="primary">
            &
          </Typography>
          <img src="/images/undraw_react_y7wq.png" />
        </Box>

        <Typography variant="body1" paragraph>
          This page is an example of a pre rendered static frame (Thanks {" "}
          <Link href="https://nextjs.org/">
            Next.js!
          </Link> 👍⚡) but then Client Side Rendered content (Cheers <Link href="https://reactjs.org/">
            React
          </Link> and
          Azure Functions! 🍻🍻). This is ideal when you need to be able to
          display up to the second dynamic content from the server, based on
          user input. The other use of this interaction with Azure Functions is
          if you need to do something server side such as send an email or edit
          persistent data in something like a database.
        </Typography>

        <Typography variant="body1" paragraph>
          In this example we are also showing the handling of State. We've
          decided to split this into two types, Client state (Global) and Sever
          State (Data). To highlight how this is being handled you will see some
          little data tags to show some of the nifty features of our server
          state handler,{" "}
          <Link href="https://react-query.tanstack.com/docs/videos">
            React-Query
          </Link>
          , such as caching results then refreshing them when needed, refreshing
          data when refocusing on the browser tab after having been away for a
          while (😴😴) and automatic query retrying. For client state we are
          using recoil that is also pretty damn neat (Find out all about{" "}
          <Link href="https://recoiljs.org/">recoil and it's Atoms here!</Link>{" "}
          ⚛⚛). With these two together we can avoid the need for something more
          boilerplate intensive such as{" "}
          <Link href="https://redux.js.org/">redux</Link> and{" "}
          <Link href="https://github.com/reduxjs/redux-thunk">thunk</Link>
        </Typography>

        <Alert severity="warning" style={{ marginBottom: "20px" }}>
          Note that we have purposely slowed down the Azure Function API's for
          this example with a 2 second sleep. AF's are normally lightening
          quick! ⚡⚡
        </Alert>

        <Typography variant="body1" paragraph>
          We've also included a notification handler in the form of{" "}
          <Link href="https://github.com/iamhosseindhv/notistack">
            NotiStack
          </Link>{" "}
          so you can, for example, notify users on the completion of those async
          tasks you have been firing off to azure functions! In this case we've
          just shoe horned it into the example when you clear the selection but
          it gives you the idea!
        </Typography>

        <Typography variant="body1" paragraph>
          To see all this in action select a Person Manual from the menu. ↖↖
        </Typography>
      </Box>
    );
  } else if (personManualQuery.isLoading) {
    setCurrentPageTitle(`${currentManualName}'s Manual`);
    CardReturn = (
      // <Skeleton component="div" width="100%" height="100%"></Skeleton>
      <Box
        width="100%"
        justifyContent="center"
        alignContent="flex-start"
        display="flex"
        flexDirection="column"
      >
        <ReactQueryStatusLabel
          style={{
            width: "fit-content",
            alignSelf: "center",
            marginBottom: "10px",
          }}
          queryKey={["manual", currentManualName]}
        />
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
            <Skeleton height={200} width={200} variant="circle"></Skeleton>
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
    setCurrentPageTitle(`Error`);
    CardReturn = (
      <Box>
        <ReactQueryStatusLabel
          style={{
            width: "fit-content",
            alignSelf: "center",
            marginBottom: "10px",
          }}
          queryKey={["manual", currentManualName]}
        />
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
    setCurrentPageTitle(`${currentManualName}'s Manual`);
    CardReturn = (
      <Box className={classes.alertRoot} display="flex" flexDirection="column">
        <Alert severity="info">
          In loading this manual we also did a shallow navigation to include the
          manual name in the URL. This means the URL could be copied and shared!
          (Deep Linking) Note: I haven't found a way to do this with clean url's
          (IE just /[manual])
        </Alert>
        <Box
          width="100%"
          justifyContent="center"
          alignContent="flex-start"
          display="flex"
          flexDirection="column"
        >
          <ReactQueryStatusLabel
            style={{
              width: "fit-content",
              alignSelf: "center",
              marginBottom: "10px",
            }}
            queryKey={["manual", currentManualName]}
          />
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
                  <Typography color="textSecondary" paragraph>
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
      style={{ marginBottom: "20px" }}
    >
      Select Manual
    </Button>
  );

  // Return the whole page setup.
  return (
    <Grid
      container
      direction="column"
      className={classes.root}
      style={{ padding: "12px" }}
    >
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
                <ReactQueryStatusLabel
                  style={{
                    alignSelf: "flex-end",
                    width: "fit-content",
                    maxWidth: "200px",
                    marginTop: "20px",
                  }}
                  queryKey={["manuals"]}
                />
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
              <ReactQueryStatusLabel
                style={{
                  alignSelf: "flex-end",
                  width: "fit-content",
                  maxWidth: "230px",
                  marginTop: "20px",
                }}
                queryKey={["manuals"]}
              />
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
