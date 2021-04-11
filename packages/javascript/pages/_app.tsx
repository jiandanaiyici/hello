import { AppProps } from 'next/app';
import '../styles/index.css';
// codepen-embed | googlecode | atelier-estuary-dark
import 'highlight.js/styles/atelier-estuary-dark.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
