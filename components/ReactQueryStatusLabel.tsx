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

const useStyles = makeStyles((theme) => ({
  tooltip: {
    fontSize: theme.typography.fontSize,
  },
}))

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

  let labelText: string
  const lastUpdated: Date = new Date(query.state.updatedAt)

  if (query.state.isFetching) {
    if (query.state.status === 'loading') {
      labelText = `Initial fetch of Data. ${
        query.state.failureCount > 0
          ? `Failed... Retry # ${query.state.failureCount}`
          : ''
      }`
    } else {
      labelText = `Data Refreshed at ${lastUpdated.toLocaleTimeString()}, Refreshing Data Now! ${
        query.state.failureCount > 0
          ? `Failed... Retry # ${query.state.failureCount}`
          : ''
      }`
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
