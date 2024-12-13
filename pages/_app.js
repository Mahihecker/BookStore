import { DataProvider } from '@/components/DataContext';
import Layout from '@/components/layout/layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps, books, authors, genres }) {
  return (
    <DataProvider books={books} authors={authors} genres={genres}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  );
}

App.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/getData');
  const data = await res.json();

  const books = data.books || [];
  const authors = data.authors || [];
  const genres = data.genres || [];

  return { books, authors, genres };
};
