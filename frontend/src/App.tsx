import { FormEvent, useState } from "react";
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
  const [newProduct, setNewProduct] = useState('');
  const helloMessage = trpc.useQuery(['hello'])
  const products = trpc.useQuery(['getProducts'])
  const addProduct = trpc.useMutation(['createProduct'])

  const client = trpc.useContext()

  const submitData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addProduct.mutate(newProduct, {
      onSuccess(data) {
        console.log(data);
        client.invalidateQueries(['getProducts'])
      },
    });
    setNewProduct('');
  }

  return (
    <div>
      <div>
        {
          products.data ? products.data.map(product => <div key={product.id}>{product.name}</div>) : null
        }
      </div>
      <form onSubmit={(e) => submitData(e)}>
        <input type="text" onChange={(e) => setNewProduct(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;