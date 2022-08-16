import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./config/trpc";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => trpc.createClient({
    url: "http://localhost:3000/trpc",
  }))
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

const AppContent = () => {

  const helloMessage = trpc.useQuery(['hello'])
  console.log(helloMessage)
  return (
    <div>
      <h1>{helloMessage.data}</h1>
    </div>
  );
}

export default App;