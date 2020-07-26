import fetch from "isomorphic-unfetch";
import {
  StarIcon,
  WatchIcon,
  BugIcon,
  AzureIcon,
  GithubIcon,
  projectIcons,
} from "../../components/Icons";
import { projects } from "../../utils/projectsData";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import NextLink from "next/link";
import Alert from "@material-ui/lab/Alert";
import { useSetRecoilState } from "recoil";
import { currentPageTitleState } from "../../state/atoms";

const useStyles = makeStyles((theme) => ({
  paperMain: {
    padding: theme.spacing(3),
  },
}));

function Project({ project, path }) {
  const projectData = projects.find((project) => project.slug === path);
  const Icon = projectIcons[projectData.id];
  const classes = useStyles();
  const setCurrentPageTitle = useSetRecoilState(currentPageTitleState);
  setCurrentPageTitle(`${path} - Deployable Framework`);
  
  return (
    <Grid container>
      <Grid item sm={false} md={2} className="Gutter"></Grid>
      <Grid item container justify="center" sm={12} md={8}>
        <Paper className={classes.paperMain} style={{ maxWidth: "800px" }}>
          <NextLink href="/DeployableFramework/PreRenderedDynamicRoutesExample" passHref>
            <Button
              variant="outlined"
              color="default"
              startIcon={<ArrowBackIcon />}
              size="medium"
              style={{ marginBottom: "20px" }}
            >
              Back to projects
            </Button>
          </NextLink>
          <Alert severity="info">Each one of these pages has been pre-rendered at Build time during the CI Deploy</Alert>
          <Grid container direction="row" spacing={3}>
            <Grid item container xs={12} justify="center">
              <Icon w={249} h={278} />
            </Grid>
            <Grid item xs={4}>
              <Box
                style={{ width: "100%" }}
                display="flex"
                justifyContent="center"
              >
                <Typography variant="body1">
                  <StarIcon w={18} h={18} /> {project.stargazers_count}
                </Typography>
              </Box>
              <Box
                style={{ width: "100%" }}
                display="flex"
                justifyContent="center"
              >
                <Typography variant="body1" color="textSecondary">
                  Stars
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                style={{ width: "100%" }}
                display="flex"
                justifyContent="center"
              >
                <Typography variant="body1">
                  <WatchIcon w={18} h={18} /> {project.watchers_count}
                </Typography>
              </Box>
              <Box
                style={{ width: "100%" }}
                display="flex"
                justifyContent="center"
              >
                <Typography variant="body1" color="textSecondary">
                  watchers
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                style={{ width: "100%" }}
                display="flex"
                justifyContent="center"
              >
                <Typography variant="body1">
                  <BugIcon w={18} h={18} /> {project.open_issues}
                </Typography>
              </Box>
              <Box
                style={{ width: "100%" }}
                display="flex"
                justifyContent="center"
              >
                <Typography variant="body1" color="textSecondary">
                  issues
                </Typography>
              </Box>
            </Grid>

            <Grid item container justify="center" xs={12}>
              <Typography variant="body1" paragraph>
                {project.description}
              </Typography>
            </Grid>
            <Grid item container xs={12} justify="center">
              <Button
                startIcon={<GithubIcon />}
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#393939" }}
                href={project.html_url}
              >
                Learn more...
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item sm={false} md={2} className="Gutter"></Grid>
    </Grid>
  );
}

export async function getStaticProps({ params }) {
  const projectsData = require("../../utils/projectsData");
  const projectData = projectsData.projects.find(
    (project) => project.slug === params.path
  );
  const ghPath = projectData.path;
  const path = params.path;

  const res = await fetch(`https://api.github.com/repos/${ghPath}`);
  const project = await res.json();
  return { props: { project, path } };
}

// This function gets called at build time
export async function getStaticPaths() {
  // Get hold of the list of all possible Dynamic Routes we want to render.
  // This could be a file in code (as below) or an external API (Not one of
  // this projects Azure Functions)
  const projectsData = require("../../utils/projectsData");

  // Get the paths we want to pre-render the data returned.
  const paths = projectsData.projects.map((project) => ({
    params: { path: project.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  // If we had a server we can do progressive pre rendering where new routes are rendered and stored!
  return { paths, fallback: false };
}

export default Project;
