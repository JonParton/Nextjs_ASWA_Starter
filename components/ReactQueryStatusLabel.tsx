import { useQueryCache } from "react-query";
import { CircularProgress, Chip } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

export function ReactQueryStatusLabel(props) {

  var   { queryKey, ...other } = props;
  const queryCache = useQueryCache();
  const query = queryCache.getQuery(queryKey);

  var labelText: string;
  var lastUpdated:Date = new Date(query.state.updatedAt)

  if (query.state.isFetching) {
    if (query.state.status === "loading") {
      labelText = `Initial fetch of Data. ${
        query.state.failureCount > 0
          ? `Failed... Retry # ${query.state.failureCount}`
          : ""
      }`;
    } else {
      labelText = `Data last Updated at ${
        lastUpdated.toLocaleTimeString()
      }, Refreshing Data Now! ${
        query.state.failureCount > 0
          ? `Failed... Retry # ${query.state.failureCount}`
          : ""
      }`;
    }
  } else if (query.state.status === "error") {
    var error: Error = query.state.error as Error;
    labelText = `Retied ${query.state.failureCount} times and still no luck. We got an error from the server. ${error.message}.`;
  } else {
    labelText = `Data last Updated at ${lastUpdated.toLocaleTimeString()}`;
  }

  return (
    <Chip
      avatar={query.state.isFetching?<CircularProgress size="small" />:<DoneIcon />}
      label={labelText}
      {...other}
    />
  );
}
