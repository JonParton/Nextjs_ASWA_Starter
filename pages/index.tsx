import React from 'react'
import { Grid, Typography, Paper, makeStyles, Link } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import IndexCard from '../components/IndexCard'
import { useSetRecoilState } from 'recoil'
import { currentPageTitleState } from '../state/atoms'

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: theme.spacing(3),
  },
  topGrid: {
    marginTop: theme.spacing(3),
  },
}))

function Home() {
  const classes = useStyles()
  const setCurrentPageTitle = useSetRecoilState(currentPageTitleState)

  setCurrentPageTitle('')

  return (
    <Grid container direction="row" alignContent="flex-start">
      <Grid xs={false} sm={2} item className="Gutter"></Grid>
      <Grid
        xs={12}
        sm={8}
        item
        container
        direction="row"
        className={classes.root}
        spacing={2}
      >
        <Grid item xs={12}>
          <Paper elevation={10} className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              Next.js Azure Static Web App Page Examples
            </Typography>
            <Typography variant="body1" gutterBottom>
              There are a few different ways to handle pages in{' '}
              <Link href="https://nextjs.org/"> Next.js</Link> and this example
              site shows you a few ways this can be done on{' '}
              <Link href="https://azure.microsoft.com/en-gb/services/app-service/static/">
                Azure Static Web Apps
              </Link>{' '}
              (ASWA&apos;s) - The free service currently in preview from
              Microsoft.
            </Typography>
            <br />
            <Alert severity="info">
              <Typography variant="body1" color="textSecondary">
                Azure Static Web Apps don&apos;t use a server at run time;
                because of this it can only serve static pages which were
                pre-rendered at build time! Something Next.js does using `next
                export`.
              </Typography>
            </Alert>
          </Paper>
        </Grid>
        {/* Card 1 */}
        <IndexCard
          title="SSR Frame, CSR Content!"
          subTitle="Let Next.js render the frame on the server then load content dynamically on the client side."
          description={`An example of client side rendered content served up by azure functions. This is how to interact with server side code from a "static" page.`}
          exampleLink="/personManuals"
          imageURL="/images/undraw_react_y7wq.png"
        />
        {/* Card 2 */}
        <IndexCard
          title="Dynamic Route, Sever Rendered (SSR)"
          subTitle="One page template, Many Server Rendered Pages"
          description={`If you would like to create many pages from a set of data that you know 
          at build time you can use Next.js's dynamic routing along with Static Props to pre-render 
          each page at build time. This could be useful for things like Blog posts or tournament results 
          where you want each page to have its own URL and data doesn't change often. `}
          exampleLink="/DeployableFramework/PreRenderedDynamicRoutesExample"
          imageURL="/images/undraw_next_js_8g5m.png"
        />
        {/* Card 3 */}
        <IndexCard
          title="Fully Static Page (SSG)"
          subTitle="Just like plain HTML but with the power of React!"
          description={`You can create a page using all the power of react such as the
                  extensive libraries available, map functions and extracting
                  HTML out into custom components etc. However Next.js will pre
                  render the page for you at build time
                  and serve it up super quick from the server!`}
          exampleLink="/staticPageExample"
          imageURL="/images/undraw_static_assets_rpm6.png"
        />
      </Grid>
      <Grid xs={false} sm={2} item className="Gutter"></Grid>
    </Grid>
  )
}
export default Home
