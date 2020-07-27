import React from 'react'
import {
  Typography,
  Button,
  makeStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Avatar,
  List,
} from '@material-ui/core'
import BackspaceIcon from '@material-ui/icons/Backspace'
import { Skeleton } from '@material-ui/lab'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { mobileMenuOpenState, currentManualNameState } from '../state/atoms'
import { usePersonManuals } from '../state/ReactQueryHooks'

const useStyles = makeStyles(() => ({
  ManualsList: {
    width: '250px',
  },
  errorStyle: {
    color: 'red',
    fontWeight: 'bold',
  },
}))

export const ManualsList: React.FunctionComponent = () => {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const setMobileMenuOpen = useSetRecoilState(mobileMenuOpenState)
  const currentManualName = useRecoilValue(currentManualNameState)
  const PersonManualsQuery = usePersonManuals()

  if (PersonManualsQuery.isLoading) {
    return (
      <List className={classes.ManualsList}>
        {[1, 2, 3, 4, 5, 6].map((i) => {
          return (
            <ListItem key={i} divider>
              <ListItemAvatar>
                <Skeleton
                  height="30px"
                  width="30px"
                  variant="circle"
                ></Skeleton>
              </ListItemAvatar>
              <ListItemText>
                <Skeleton height="30px" />
              </ListItemText>
            </ListItem>
          )
        })}
      </List>
    )
  } else if (PersonManualsQuery.isError) {
    return (
      <List className={classes.ManualsList}>
        <ListItem key="Error">
          <Box component="div">
            <Typography
              variant="h4"
              className={classes.errorStyle}
              gutterBottom
            >
              Error:
            </Typography>
            <Typography variant="body1" paragraph>
              Error from the server: &quot;{PersonManualsQuery.error.message}
              &quot;
            </Typography>
            <Typography variant="body1" paragraph>
              If this is happening locally, did you start the azure functions?
            </Typography>
          </Box>
        </ListItem>
      </List>
    )
  } else {
    if (
      PersonManualsQuery.data !== undefined &&
      PersonManualsQuery.data.numberOfRecords > 0
    ) {
      return (
        <List className={classes.ManualsList}>
          <Typography key="title" variant="h5" color="primary" gutterBottom>
            Available Manuals:
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<BackspaceIcon />}
            onClick={() => {
              router.push(`/CSRExample`, undefined, { shallow: true })
              enqueueSnackbar('Returned to explanation', { variant: 'info' })
              setMobileMenuOpen(false)
            }}
            disabled={currentManualName.length == 0 ? true : false}
            style={{ marginBottom: '10px' }}
          >
            Clear Selection
          </Button>
          {PersonManualsQuery.data.manuals.map((manual) => {
            return (
              <React.Fragment key={manual.id}>
                <ListItem
                  button
                  component="a"
                  href="#"
                  onClick={() => {
                    router.push(
                      `/CSRExample?manual=${manual.name}`,
                      undefined,
                      { shallow: true },
                    )
                    setMobileMenuOpen(false)
                  }}
                  selected={manual.name == currentManualName ? true : false}
                  divider
                >
                  <ListItemAvatar>
                    <Avatar src={manual.AvatarURL} />
                  </ListItemAvatar>
                  <ListItemText primary={manual.name} />
                </ListItem>
              </React.Fragment>
            )
          })}
        </List>
      )
    } else {
      return (
        <List className={classes.ManualsList}>
          <ListItem>No Manuals from the API...</ListItem>
        </List>
      )
    }
  }
}

export default ManualsList
