import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Nav from "@/components/Nav";
import Foot from "@/components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { cacheTime: 1000 * 60 * 60 * 24 },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Component {...pageProps} />
      <Foot />
    </QueryClientProvider>
  );
}
