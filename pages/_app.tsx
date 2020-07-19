import '../styles/reset.css';
import '../styles/main.css';
import { CssBaseline } from '@material-ui/core';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <div>
      <CssBaseline />
      <Component {...pageProps} />
    </div>
  );
}
