import { useEffect } from 'react'
import {
  Grid,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Paper,
  Box,
  Hidden,
  Button,
  SwipeableDrawer,
  Link,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ListIcon from '@material-ui/icons/List'
import NextLink from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import {
  currentManualNameState,
  currentPageTitleState,
  mobileMenuOpenState,
} from '../state/atoms'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { ReactQueryDevtools } from 'react-query-devtools'
import { ReactQueryStatusLabel } from '../components/ReactQueryStatusLabel'
import ManualDisplay from '../components/ManualDisplay'
import ManualsList from '../components/ManualsList'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    flexGrow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    ManualsListPaper: {
      width: '100%',
      minWidth: '250px',
      height: '100%',
      padding: theme.spacing(3),
      overflowY: 'auto',
    },
    MainManual: {
      padding: theme.spacing(3),
      width: '100%',
      height: '100%',
    },
    MobileManualsMenuContainer: {
      marginTop: -theme.spacing(3),
    },
    MobileManualsMenu: {
      padding: theme.spacing(3),
      width: '100%',
    },
    MobileSideBar: {
      padding: theme.spacing(3),
    },
    imageBanner: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      '& > img': {
        minWidth: '150px',
        maxWidth: '400px',
        width: '30%',
      },
    },
  }),
)

export const CSRExample: React.FunctionComponent = () => {
  const classes = useStyles()
  const router = useRouter()
  const [currentManualName, setCurrentManualName] = useRecoilState(
    currentManualNameState,
  )
  const [mobileMenuOpen, setMobileMenuOpen] = useRecoilState(
    mobileMenuOpenState,
  )
  const setCurrentPageTitle = useSetRecoilState(currentPageTitleState)

  // On load or when the Query string changes make sure we set our states.
  useEffect(() => {
    if (router.query && router.query.manual) {
      const manualString: string = router.query.manual as string
      setCurrentManualName(manualString)
    } else {
      setCurrentManualName('')
    }
  }, [router])

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setMobileMenuOpen(open)
  }

  const BackButton = () => (
    <NextLink href="/" passHref>
      <Button
        variant="outlined"
        color="default"
        startIcon={<ArrowBackIcon />}
        size="medium"
        style={{ marginBottom: '20px' }}
      >
        Back to index
      </Button>
    </NextLink>
  )

  const SelectManualsButton = () => (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      onClick={toggleDrawer(true)}
      startIcon={<ListIcon />}
      style={{ marginBottom: '20px' }}
    >
      Select Manual
    </Button>
  )

  const MainContent = () => {
    if (currentManualName.length == 0) {
      setCurrentPageTitle(`CSR Example`)
      return <CSRExampleText />
    } else {
      return <ManualDisplay />
    }
  }

  const CSRExampleText = () => (
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
        This page is an example of a pre rendered static frame (Thanks{' '}
        <Link href="https://nextjs.org/">Next.js!</Link> 👍⚡) but then Client
        Side Rendered content (Cheers{' '}
        <Link href="https://reactjs.org/">React</Link> and Azure Functions!
        🍻🍻). This is ideal when you need to be able to display up to the
        second dynamic content from the server, based on user input. The other
        use of this interaction with Azure Functions is if you need to do
        something server side such as send an email or edit persistent data in
        something like a database.
      </Typography>

      <Typography variant="body1" paragraph>
        In this example we are also showing the handling of State. We&apos;ve
        decided to split this into two types, Client state (Global) and Sever
        State (Data). To highlight how this is being handled you will see some
        little data tags to show some of the nifty features of our server state
        handler,{' '}
        <Link href="https://react-query.tanstack.com/docs/videos">
          React-Query
        </Link>
        , such as caching results then refreshing them when needed, refreshing
        data when refocusing on the browser tab after having been away for a
        while (😴😴) and automatic query retrying. For client state we are using
        recoil that is also pretty damn neat (Find out all about{' '}
        <Link href="https://recoiljs.org/">
          recoil and it&apos;s Atoms here!
        </Link>{' '}
        ⚛⚛). With these two together we can avoid the need for something more
        boilerplate intensive such as{' '}
        <Link href="https://redux.js.org/">redux</Link> and{' '}
        <Link href="https://github.com/reduxjs/redux-thunk">thunk</Link>
      </Typography>

      <Alert severity="warning" style={{ marginBottom: '20px' }}>
        Note that we have purposely slowed down the Azure Function API&apos;s
        for this example with a 2 second sleep. AF&apos;s are normally
        lightening quick! ⚡⚡
      </Alert>

      <Typography variant="body1" paragraph>
        We&apos;ve also included a notification handler in the form of{' '}
        <Link href="https://github.com/iamhosseindhv/notistack">NotiStack</Link>{' '}
        so you can, for example, notify users on the completion of those async
        tasks you have been firing off to azure functions! In this case
        we&apos;ve just shoe horned it into the example when you clear the
        selection but it gives you the idea!
      </Typography>

      <Typography variant="body1" paragraph>
        To see all this in action select a Person Manual from the menu. ↖↖
      </Typography>
    </Box>
  )

  // Return the whole page setup.
  return (
    <Grid
      container
      direction="column"
      className={classes.root}
      style={{ padding: '12px' }}
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
                    alignSelf: 'flex-end',
                    width: 'fit-content',
                    maxWidth: '230px',
                    marginTop: '20px',
                  }}
                  queryKey={['manuals']}
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
                  alignSelf: 'flex-end',
                  width: 'fit-content',
                  maxWidth: '230px',
                  marginTop: '20px',
                }}
                queryKey={['manuals']}
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
              <MainContent />
            </Box>
          </Paper>
        </Grid>
        <Grid md={false} lg={2} item className="Gutter"></Grid>
      </Grid>
      <ReactQueryDevtools />
    </Grid>
  )
}

// // This is a bit of example code used to test if the NEXT_PUBLIC_API
// // environment variable can be seen both on server and client side.
// export async function getStaticProps() {
//   // Do our server side code
//   console.log("API address Server:")
//   console.log(process.env.NEXT_PUBLIC_API);
//
//   // Continue the page load!
//   return {props:{}}
// };

export default CSRExample
