import { useQueryCache, QueryKeyOrPredicateFn } from 'react-query'
import {
  CircularProgress,
  Chip,
  Tooltip,
  makeStyles,
  ChipProps,
} from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { useState, useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
  tooltip: {
    fontSize: theme.typography.fontSize,
  },
}))

// A custom hook to allow the Component to listen to updates from a callback function.
function useForceUpdate() {
  const [value, setValue] = useState(0) // integer state
  return () => setValue((value) => ++value) // update the state to force render
}

type ReactQueryStatusLabelProps = {
  queryKey: QueryKeyOrPredicateFn
}

type extendedChipProps = ChipProps & ReactQueryStatusLabelProps
export const ReactQueryStatusLabel: React.FunctionComponent<extendedChipProps> = (
  props,
) => {
  const { queryKey, ...other } = props
  const queryCache = useQueryCache()
  const query = queryCache.getQuery(queryKey)
  const classes = useStyles()

  // For some reason the userQueryCache hook does not update for changes to the cache!
  // (Shallow compare maybe?) To get around this we have to pass our own function to
  // the subscribe method of the cach and faux some state to cause an update  when
  // something happens to our query (Feels Hacky but works!).
  const forceUpdate = useForceUpdate()
  useEffect(() => {
    queryCache.subscribe((queryCache, query) => {
      if (query) {
        if (query.queryKey.toString() == queryKey.toString()) {
          forceUpdate()
        }
      }
    })
  }, [])

  let labelText: string
  const lastUpdated: Date = new Date(query.state.updatedAt)

  if (query.state.isFetching) {
    if (query.state.status === 'loading') {
      labelText = `${
        query.state.failureCount > 0
          ? `Failed... Retry # ${query.state.failureCount} - `
          : ''
      }
      Initial fetch of Data.`
    } else {
      labelText = `${
        query.state.failureCount > 0
          ? `Failed... Retry # ${query.state.failureCount} - `
          : ''
      }Data Refreshed at ${lastUpdated.toLocaleTimeString()}, Refreshing Data Now!`
    }
  } else if (query.state.status === 'error') {
    const error: Error = query.state.error as Error
    labelText = `Retried ${query.state.failureCount} times and still no luck. We got an error from the server. ${error.message}.`
  } else {
    labelText = `Data Refreshed at ${lastUpdated.toLocaleTimeString()}`
  }

  return (
    <Tooltip
      title={labelText}
      classes={{ tooltip: classes.tooltip }}
      enterTouchDelay={0}
    >
      <Chip
        avatar={
          query.state.status === 'error' ? (
            <ErrorOutlineIcon />
          ) : query.state.isFetching ? (
            <CircularProgress size="small" />
          ) : (
            <DoneIcon />
          )
        }
        label={labelText}
        {...other}
      />
    </Tooltip>
  )
}
