import SmallCard from "../../components/SmallCard";
import { projectIcons } from "../../components/Icons";

import { projects } from "../../utils/projectsData";
import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@material-ui/core";
import NextLink from "next/link";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    padding: theme.spacing(3),
  },
  topGrid: {
    marginTop: theme.spacing(3),
  },
}));

function PreRenderedDynamicRoutesExample() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item sm={false} md={2} className="Gutter"></Grid>
      <Grid item sm={12} md={8}>
        <Paper className={classes.paper}>
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
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Pre-Rendered Dynamic Routes Example
          </Typography>
          <Typography variant="body1" color="textPrimary" paragraph>
            If you have a Dynamic route like the one in this example (
            `/DynamicRoute/<strong>[Path]</strong>` ) you can tell Next.js to
            pre render all the possible routes at build time using `next export`
            and these are the pages that will be served up by the Azure Static
            Web App.
          </Typography>
          <Typography variant="body1" color="textPrimary" paragraph>
            To give you an example of this I continued the idea from the
            Microsoft Documentation and Below we have told the server to
            Pre-Render a route/page for each of the frameworks you can publish
            to Azure Static Web Apps.
          </Typography>
          <Alert severity="info" elevation={2} style={{ marginBottom: "20px" }}>
            Note that because each page is pre-rendered during the CI
            Build/Deploy information like the current Stars and Issues for each
            framework will be frozen in time as of the code publish date.
          </Alert>
          <Alert
            severity="warning"
            elevation={2}
            style={{ marginBottom: "20px" }}
          >
            For the pre-rendering of routes to work, you must know all the
            dynamic routes at build time and this information cannot come from
            the projects own Azure Functions!
          </Alert>
          <Grid container direction="row" spacing={3}>
            {projects.map((project) => {
              const Icon = projectIcons[project.id];
              return (
                <Grid item xs={12} md={4} key={project.id}>
                  <Card className={classes.root} elevation={4}>
                    <NextLink
                      href={`/DeployableFramework/${project.slug}`}
                      passHref
                    >
                      <CardActionArea>
                        <Box
                          display="flex"
                          justifyContent="center"
                          style={{ width: "100%" }}
                        >
                          <Icon w={153} h={163} />
                        </Box>
                        <CardContent>
                          <Box
                            display="flex"
                            justifyContent="center"
                            style={{ width: "100%" }}
                          >
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {project.name}
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </NextLink>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Grid>
      <Grid item sm={false} md={2} className="Gutter"></Grid>
    </Grid>
  );
}

export default PreRenderedDynamicRoutesExample;
