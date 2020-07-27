import React from 'react'
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardActionArea,
} from '@material-ui/core'
import NextLink from 'next/link'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  pos: {
    marginBottom: theme.spacing(2),
  },
  flexBoxColumn: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  flexGrow: {
    flexGrow: 1,
  },
  media: {
    height: 270,
    width: '100%',
  },
}))

type IndexCardPropTypes = {
  title: string
  subTitle: string
  description: string
  exampleLink: string
  imageURL: string
}

export const IndexCard: React.FunctionComponent<IndexCardPropTypes> = ({
  title,
  subTitle,
  description,
  exampleLink,
  imageURL,
}) => {
  const classes = useStyles()
  return (
    <Grid item sm={12} md={4}>
      <NextLink href={exampleLink}>
        <Card className={classes.flexBoxColumn} elevation={10}>
          <CardActionArea
            className={clsx(classes.flexGrow, classes.flexBoxColumn)}
          >
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
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="medium" variant="contained" fullWidth color="primary">
              See Example
            </Button>
          </CardActions>
        </Card>
      </NextLink>
    </Grid>
  )
}

export default IndexCard
