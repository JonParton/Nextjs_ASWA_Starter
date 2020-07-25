import React from "react";
import {
  Grid,
  Typography,
  Button,
  Paper,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from "@material-ui/core";
import NextLink from "next/link";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    //minWidth: 275,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  pos: {
    marginBottom: 12,
  },
  flexGrow: {
    flexGrow: 1,
  },
  media: {
    height: 270,
  },
}));

export default function IndexCard({
  title,
  subTitle,
  description,
  exampleLink,
  imageURL,
}) {
  const classes = useStyles();
  return (
    <Grid item sm={12} md={4}>
      <NextLink href={exampleLink}>
        <Card className={classes.cardRoot} elevation={10}>
          <CardMedia className={classes.media} image={imageURL} />
          <CardContent className={classes.flexGrow}>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {subTitle}
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              {description}
            </Typography>
            {/* <Typography variant="body2" component="p">
            To illustrate this click below to see an example of a simple about
            page.
          </Typography> */}
          </CardContent>
          <CardActions>
            <Button size="medium" variant="contained" fullWidth color="primary">
              See Example
            </Button>
          </CardActions>
        </Card>
      </NextLink>
    </Grid>
  );
}
