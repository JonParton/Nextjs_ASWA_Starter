import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Tooltip,
  Link,
} from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import NextLink from 'next/link'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textTransform: 'none',
  },
  tooltip: {
    fontSize: '20px',
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NextLink href="/" passHref>
            <Button color="inherit" component="a" className={classes.title}>
              <Typography variant="h6" className={classes.title}>
                Next.js ASWA&apos;s Example
              </Typography>
            </Button>
          </NextLink>
          <Tooltip
            title="See the code on GitHub"
            aria-label="See the code on GitHub"
            classes={{ tooltip: classes.tooltip }}
          >
            <Link
              href="https://github.com/JonParton/Nextjs_ASWS_Starter"
              color="inherit"
            >
              <Button
                component="span"
                startIcon={<GitHubIcon />}
                color="inherit"
              >
                <Box display={{ xs: 'none', sm: 'block' }}>
                  <Typography variant="h6" className={classes.title}>
                    See the code on GitHub
                  </Typography>
                </Box>
              </Button>
            </Link>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  )
}
