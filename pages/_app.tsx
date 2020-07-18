import '../styles/reset.css';
import '../styles/main.css';
import { CssBaseline } from '@material-ui/core';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <CssBaseline />
      <Component {...pageProps} />
    </div>
  );
}
