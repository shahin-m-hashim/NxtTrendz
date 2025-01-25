# Tanstack Query + Zustand + Axios

## How to Synchronize State, Cache, and Backend

### Core Principles

When working with React, managing state efficiently is critical. Using Tanstack Query (React Query) for data fetching, Zustand for global state management, and Axios for API calls provides a powerful combination. However, synchronizing these three properly is essential to prevent redundant requests, unnecessary renders, and inconsistencies.

### Best Practices for Synchronization

### Configuration

1. Zustand -

Create individual slices and combine them together in a single store, make use of react devtools for
powerful debugging along with immer to handle state updates and immutability in a clean, readable and
predictable way.

Config -

```javascript
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import createAuthSlice from "store/authSlice";

const useStore = create(
  devtools(
    immer((set, get) => ({
      ...createAuthSlice(set, get),
    })),
    {
      name: "store",
      enabled: import.meta.env.VITE_ENVIRONMENT === "development",
    }
  )
);
```

2. Tanstack Query -

```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 1 * 60 * 60 * 1000, // 1 hour
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});
```

stale time - the time after which a query is considered stale and will be re fetched

cache time - the time after which cache will be cleared if cached data is no longer used

3. Axios -

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ORIGIN,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
```

#### 1. **Fetching and Caching Data with Tanstack Query**

Tanstack Query handles fetching, caching, and background updates. The key is to use query keys effectively so that data remains cached and doesn't refetch unnecessarily.

```javascript
const { id } = useParams();

const { data, isLoading, isError, isFetching, isFetched } = useQuery({
  queryKey: ["products", id],
  queryFn: () => getProduct(id),
});
```

#### 2. **Using Cached Data Efficiently**

When navigating between pages where we actually fetched the data, previously fetched data should be used from the cache and not from the store. A common mistake is using `useEffect` to sync React Query data with Zustand and using the store state to update the UI. Instead, only use setter function from store and leverage the render cycle with `isFetched` to update the store directly inside the component.

```javascript
const { data, isLoading, isError, isFetching, isFetched } = useQuery({
  queryKey: ["products", id],
  queryFn: () => getProduct(id),
});

if (isFetched) setProduct(data.product);

return (
  <img
    alt={data.product.title}
    src={data.product.image_url}
    className="object-cover object-center rounded-lg size-full"
  />
);
```

#### 3. **Handling Updates**

When modifying data (e.g., updating the cart quantity), ensure that both the cache and store are updated to keep them in sync.

```javascript
const { isPending,isError } = useMutation({
  mutationFn: (username, password) => loginUser(username, password),
  onSuccess: () => queryClient.setQueryData(["products", id], (oldData) => ({
    ...oldData,
    ...newData,
  }));
});


export const loginUser = async ({ username, password }) => {
  try {
    const res = await api.post("/auth/login", { username, password });
    useStore.getState().login(res.data?.data);
  } catch (e) {
    throw new Error(e.response?.data?.error || "Invalid credentials.");
  }
};


```

#### 5. **Handling Refetching**

The best way is to customize defaults to never refetch on window focus or mount, and giving a decent long
stale time cache fetched data. Then use a unique key to each query to refetch whenever something changes or use invalidateQueries if its really necessary.

```javascript
queryClient.invalidateQueries(["products", id]);
```

This ensures that the cache does not serve stale data when a meaningful update occurs.

### Summary

- **Use React Query for fetching and caching.**
- **Use Zustand for managing derived state that isn't part of the backend response.**
- **Avoid useEffect for syncing the store with the cache; use isFetched instead.**
- **Leverage cached data to prevent unnecessary requests.**
- **Update both the store and cache when modifying data.**
- **Invalidate queries when backend updates require refetching.**

This approach keeps state management predictable, efficient, and minimizes redundant network requests while ensuring a smooth UX.
