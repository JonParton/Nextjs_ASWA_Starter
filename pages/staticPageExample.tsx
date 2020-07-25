import {
  Grid,
  Typography,
  Paper,
  Container,
  Box,
  Button,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import NextLink from "next/link";

const staticPageExample = () => (
  // Note styles are added here using the Main.css instead of using Javascript styling. This is just to give an example of doing this!
  // In reality I would still  probably use makestyles but if you are importing some static html likely all the styles are already in
  // a .css file.
  <Grid container direction="row">
    <Grid item sm={false} md={2} className="Gutter"></Grid>
    <Grid item sm={12} md={8}>
      <Paper elevation={8} className="staticMain">
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
        <Typography variant="h3" gutterBottom>
          Example Static Page
        </Typography>
        <Typography variant="body1" paragraph>
          This is a completely static page that can contain any HTML elements
          you would normally be able to include but can also use the power of
          React too! All the react code will be pre-rendered by Next.JS at build
          time and turned into a static HTML page.
        </Typography>
        <Box className="polaroid">
          <img src="/images/undraw_static_assets_rpm6.png"></img>
          <Typography variant="caption" color="textSecondary">
            You can include static content in the "/public/" folder and access
            it as "/"{" "}
          </Typography>
        </Box>
        <Typography variant="body1" color="textPrimary" paragraph>
          As shown with the image above static assets (Images, videos etc) can
          easily be served up. The image above is actually stored in the project
          source under `public/images/undraw_static_assets_rpm6.png` however
          Next.js makes it magically available at
          `/images/undraw_static_assets_rpm6.png` (notice the lack of{" "}
          <strong>public!</strong>)
        </Typography>
        <Typography variant="body1" color="textPrimary" paragraph>
          If porting previously static html pages this is something you will
          want to be aware of as well as converting any inline styles to be
          react JSX / TSX compliant.
        </Typography>
        <Typography variant="body1" color="textPrimary" paragraph>
          You can also use React to .map() from an array to do repetitive HTML
          templates such as the below.
        </Typography>
        <Grid
          container
          justify="center"
          spacing={5}
          style={{ marginBottom: "20px" }}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((value) => (
            <Grid key={value} item>
              <Paper
                style={{
                  height: 200,
                  width: 100,
                  display: "Flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                elevation={8}
              >
                <Typography variant="body1" color="textPrimary">
                  Card {value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Typography variant="body1" color="textPrimary" paragraph>
          The above is a singular block of Card code that has been mapped from a simple value array.
        </Typography>
      </Paper>
    </Grid>

    <Grid item sm={false} md={2} className="Gutter"></Grid>
  </Grid>

  // <div className="about">
  //   <div className="container">
  //   <h1>About</h1>
  //   <div>
  //       <p>This is a completely static page that can contain images and all sorts.</p>
  //       <p>You can use this style to basically copy any static HTML files you have created previously and have Next.JS Serve them up for you! </p>
  //   </div>
  //   <p><a href="/"> Go Home!</a></p>
  //   </div>
  // </div>
);

export default staticPageExample;
