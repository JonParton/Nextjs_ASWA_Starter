import React from 'react'
import {
  Typography,
  makeStyles,
  Box,
  CardContent,
  Theme,
  Card,
  CardMedia,
} from '@material-ui/core'
import { Skeleton, Alert } from '@material-ui/lab'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentManualNameState, currentPageTitleState } from '../state/atoms'
import { usePersonManual } from '../state/ReactQueryHooks'
import { ReactQueryStatusLabel } from './ReactQueryStatusLabel'

const useStyles = makeStyles((theme: Theme) => ({
  errorStyle: {
    color: 'red',
    fontWeight: 'bold',
  },
  manualCardRoot: {
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignSelf: 'center',
  },
  cardMedia: {
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
  alertRoot: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export const ManualDisplay: React.FunctionComponent = () => {
  const classes = useStyles()
  const currentManualName = useRecoilValue(currentManualNameState)
  const personManualQuery = usePersonManual(currentManualName)
  const setCurrentPageTitle = useSetRecoilState(currentPageTitleState)

  // Work out what we should display in the Main content for this manual.
  if (personManualQuery.isLoading) {
    setCurrentPageTitle(`${currentManualName}'s Manual`)
    return (
      // <Skeleton component="div" width="100%" height="100%"></Skeleton>
      <Box
        width="100%"
        justifyContent="center"
        alignContent="flex-start"
        display="flex"
        flexDirection="column"
      >
        <ReactQueryStatusLabel
          style={{
            width: 'fit-content',
            alignSelf: 'center',
            marginBottom: '10px',
          }}
          queryKey={['manual', currentManualName]}
        />
        <Card
          className={classes.manualCardRoot}
          variant="outlined"
          elevation={8}
        >
          <Box
            width="100%"
            justifyContent="center"
            display="flex"
            paddingTop="28px"
          >
            <Skeleton height={200} width={200} variant="circle"></Skeleton>
          </Box>
          <CardContent>
            <Typography variant="h5" component="h2">
              <Skeleton width={80} />
            </Typography>
            <Typography color="textSecondary">
              <Skeleton width={160} />
            </Typography>
            <Typography variant="body2" component="p">
              <Skeleton width={'100%'} />
              <Skeleton width={'100%'} />
              <Skeleton width={'60%'} />
            </Typography>
          </CardContent>
        </Card>
      </Box>
    )
  } else if (personManualQuery.isError) {
    setCurrentPageTitle(`Error`)
    return (
      <Box>
        <ReactQueryStatusLabel
          style={{
            width: 'fit-content',
            alignSelf: 'center',
            marginBottom: '10px',
          }}
          queryKey={['manual', currentManualName]}
        />
        <Typography variant="h4" className={classes.errorStyle} gutterBottom>
          Error:
        </Typography>
        <Typography variant="body1" paragraph>
          {personManualQuery.error.message}
        </Typography>
        <Typography variant="body1" paragraph>
          If this is happening locally, did you start the azure functions?
        </Typography>
      </Box>
    )
  } else if (
    personManualQuery.data !== undefined &&
    personManualQuery.data.numberOfRecords == 1
  ) {
    setCurrentPageTitle(`${currentManualName}'s Manual`)
    return (
      <Box className={classes.alertRoot} display="flex" flexDirection="column">
        <Alert severity="info">
          In loading this manual we also did a shallow navigation to include the
          manual name in the URL. This means the URL could be copied and shared!
          (Deep Linking) Note: I haven&apos;t found a way to do this with clean
          url&apos;s (IE just /[manual])
        </Alert>
        <Box
          width="100%"
          justifyContent="center"
          alignContent="flex-start"
          display="flex"
          flexDirection="column"
        >
          <ReactQueryStatusLabel
            style={{
              width: 'fit-content',
              alignSelf: 'center',
              marginBottom: '10px',
            }}
            queryKey={['manual', currentManualName]}
          />
          {personManualQuery.data.manuals.map((manual) => {
            return (
              <Card
                className={classes.manualCardRoot}
                variant="outlined"
                elevation={8}
                key={manual.id}
              >
                <CardMedia
                  className={classes.cardMedia}
                  image={manual.AvatarURL}
                  title={`${manual.name}'s Avatar`}
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {manual.name}
                  </Typography>
                  <Typography color="textSecondary" paragraph>
                    Answer to the meaning of life:{' '}
                    {manual.answerToTheMeaningOfLife}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {manual.description}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </Box>
      </Box>
    )
  } else {
    return <div>Please Select a manual on the left hand side.</div>
  }
}

export default ManualDisplay
