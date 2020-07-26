import React from 'react'
import '../styles/main.css'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { CssBaseline, Grid as Box, makeStyles } from '@material-ui/core'
import NavBar from '../components/NavBar'
import { SnackbarProvider } from 'notistack'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { currentFullPageTitleState } from '../state/atoms'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  mainContent: {
    marginTop: theme.spacing(3),
    flexGrow: 1,
    display: 'flex',
  },
}))

// A small component that lives inside RecoilRoot and allows us to set the page title from anywhere in the App!
function CustomHeadTitle() {
  const currentFullPageTitle = useRecoilValue(currentFullPageTitleState)

  return (
    <Head>
      <title>{currentFullPageTitle}</title>
    </Head>
  )
}

// This default export is required in a new `pages/_app.js` file.
export const MyApp: React.FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}) => {
  const classes = useStyles()

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <RecoilRoot>
      <SnackbarProvider
        maxSnack={2}
        autoHideDuration={2000}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <CssBaseline />
        <CustomHeadTitle />
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
  )
}

export default MyApp
