import { useIsFetching } from "react-query";
import { useSnackbar } from "notistack";

export function GlobalReactQueryNotifier() {
  const isFetching = useIsFetching();
  const { enqueueSnackbar} = useSnackbar();

  if (isFetching) {
    enqueueSnackbar("Loading Data from Server", { variant:"info" });
  }

  return null;
}
