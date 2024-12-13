import { DataProvider } from '@/components/DataContext';
import Layout from '@/components/layout/layout';
import '@/styles/globals.css';
import { AuthProvider } from "../context/AuthContext";

export default function App({ Component, pageProps, books, authors, genres }) {
  return (
    <AuthProvider>
      <DataProvider books={books} authors={authors} genres={genres}>
         <Layout>
           <Component {...pageProps} />
         </Layout>
      </DataProvider>
    </AuthProvider>
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
