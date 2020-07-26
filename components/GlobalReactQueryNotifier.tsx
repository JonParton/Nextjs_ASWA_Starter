import { useIsFetching } from 'react-query'
import { useSnackbar } from 'notistack'

export const GlobalReactQueryNotifier: React.FunctionComponent = () => {
  const isFetching = useIsFetching()
  const { enqueueSnackbar } = useSnackbar()

  if (isFetching) {
    enqueueSnackbar('Loading Data from Server', { variant: 'info' })
  }

  return null
}
