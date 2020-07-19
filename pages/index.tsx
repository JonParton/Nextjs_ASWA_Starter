import React from 'react';
import {
  Grid,
  Typography,
  Paper,
  makeStyles,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import NavBar from "../components/NavBar";
import IndexCard from "../components/IndexCard";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: theme.spacing(3),
  },
  topGrid: {
    marginTop: theme.spacing(3),
  },
}));

function Home() {
  const classes = useStyles();

  return (
        <Grid container direction="row">
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
                  There are a few different ways to handle pages in Next.js and
                  this example site shows you a few ways this can be handled on
                  Azure Static Web Apps (ASWA's).
                </Typography>
                <br />
                <Alert severity="info" >
                  <Typography variant="body1" color="textSecondary">
                    Azure Static Web Apps don't use a server at run time; because of this it can only serve static pages which were pre-rendered at build time!
                  </Typography>
                </Alert>
              </Paper>
            </Grid>
            {/* Card 1 */}
            <IndexCard 
              title="Fully Static Page"
              subTitle="Just like plain HTML but with the power of React!"
              description={`You can create a page using all the power of react such as the
                extensive libraries available, map functions and extracting
                HTML out into custom components etc. However Next.js will pre
                render the page for you at build time
                and serve it up super quick from the server!`}
              exampleLink="/staticPageExample"
            />
            {/* Card 2 */}
            <IndexCard 
              title="Dynamic Route, Sever Rendered"
              subTitle="One page template, Many Server Rendered Pages"
              description={`If you would like to create many pages from a set of data that you know 
                at build time you can use Next.js's dynamic routing along with Static Props to pre-render 
                each page at build time. This could be useful for things like Blog posts or tournament results 
                where you want each page to have its own URL and data doesn't change often. `}
              exampleLink="/project/projects"
  
            />
            {/* Card 3 */}
            <IndexCard 
              title="SSR Frame, CSR Content!"
              subTitle="Let Next.js render the frame on the server then load content dynamically on the client side."
              description={`An example of client side rendered content served up by azure functions. This is how to interact with server side code from a "static" page.`}
              exampleLink="/personManuals"
  
            />
          </Grid>
          <Grid xs={false} sm={2} item className="Gutter"></Grid>
        </Grid>
  );
}
export default Home;
