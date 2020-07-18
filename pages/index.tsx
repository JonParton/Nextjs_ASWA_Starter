import SmallCard from "../components/SmallCard";
import { projectIcons } from "../components/Icons";
import {
  Grid,
  Typography,
  Button,
  Paper,
  makeStyles,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import NavBar from "../components/NavBar";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: theme.spacing(3),
  },
  topGrid: {
    marginTop: theme.spacing(3),
  },
  cardRoot: {
    //minWidth: 275,
    height:"100%",
    display:"flex",
    flexDirection:"column",
  },
  pos: {
    marginBottom: 12,
  },
  cardImage:{
    height:"100px",
  },
  flexGrow:{
    flexGrow:1,
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid>
        <NavBar></NavBar>
      </Grid>
      <Grid container direction="row" className={classes.topGrid}>
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
              <Typography variant="body1" color="textSecondary">
                Please Note - Because Azure Static Web Apps can only serve static pages and do not run a server, you cannot do Server Side Rendering on user request, Just pre-rendering at build time!
              </Typography>
            </Paper>
          </Grid>
          {/* Card 1 */}
          <Grid item xs={12} sm={4}>
            <Card className={classes.cardRoot} elevation={10}>
              <CardContent className={classes.flexGrow}>
                <Typography variant="h5" component="h2">
                  Fully Static Page
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Just like plain HTML but with the power of React!
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                  You can create a page using all the power of react such as the
                  extensive libraries available, map functions and extracting
                  HTML out into custom components etc. however Next.js will pre
                  render the page for you as a static HTML page at build time
                  and serve it up super quick from the server!
                </Typography>
                <Typography variant="body2" component="p">
                  To illustrate this click below to see an example of a simple
                  about page.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="medium"
                  variant="contained"
                  fullWidth
                  color="primary"
                  
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          {/* Card 2 */}
          <Grid item xs={12} sm={4}>
            <Card className={classes.cardRoot} elevation={10}>
              <CardContent className={classes.flexGrow}>
                <Typography variant="h5" component="h2">
                  Dynamic Route, Sever Rendered
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  One page template, Many Server Rendered Pages
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                An example of pre-rendered pages which could be useful for things like blogs or slowly changing data such as tournament results.
                </Typography>
                <Typography variant="body2" component="p" className={classes.cardLastText}>
                  To illustrate this click below to see an example of a simple
                  about page.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="medium"
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          {/* Card 3 */}
          <Grid item xs={12} sm={4}>
            <Card className={classes.cardRoot} elevation={10}>
              <CardContent className={classes.flexGrow}>
                <Typography variant="h5" component="h2">
                  SSR Frame, CSR Content!
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Let Next.js render the frame on the server then load content dynamically on the client side. 
                </Typography>
                <Typography variant="body2" component="p" gutterBottom>
                An example of client side rendered content served up by azure functions. This is how to interact with server side code from a "static" page.
                </Typography>
                <Typography variant="body2" component="p">
                  To illustrate this click below to see an example of a simple
                  about page.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="medium"
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Grid xs={false} sm={2} item className="Gutter"></Grid>
      </Grid>
    </Grid>

    // <div className="home">
    //   <h1>Splash Screen</h1>
    //   <div className="card-grid">
    //     <a className="card-small" href={`/personManuals`}>
    //       <h3>People Instruction Manuals</h3>
    //       <p>An example of client side rendered content served up by azure functions. This is how to interact with server side code from a "static" page.</p>
    //     </a>
    //     <a className="card-small" href={`/project/projects`}>
    //       <h3>Projects</h3>
    //       <p>An example of pre-rendered pages which could be useful for things like blogs or slowly changing data such as tournament results.</p>
    //     </a>
    //     <a className="card-small" href={`/about`}>
    //       <h3>About</h3>
    //       <p>An example of a completely static page with that is pre rendered and server super fast bu the Azure Static Web App</p>
    //     </a>
    //   </div>
    // </div>
  );
}
export default Home;
