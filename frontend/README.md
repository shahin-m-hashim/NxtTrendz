# Tanstack Query + Zustand + Axios

When working with React, managing state efficiently is critical. Using Tanstack Query (React Query) for data fetching, Zustand for global state management, and Axios for API calls provides a powerful combination. However, synchronizing data in store,cache and backend properly is essential to prevent redundant requests, unnecessary renders, and inconsistencies.

## Basics

1. What is caching and why its important?
   Caching is a technique used to improve performance by storing and reusing previously fetched data. It allows us to avoid making redundant requests to the server and improve the efficiency of our application.

2. What is garbage collection?
   Garbage collection is a process that automatically removes unused memory from the computer's memory, freeing up space for new data. Its purpose is to optimize memory usage and prevent memory leaks.

3. What and when to use cache?
   Caching everything is bad, coz a website can have real-time and static data. Only data that doesn't change frequently should be cached and real time data fetching is completely dependent on the fetching data itself.

   Example :-

   An e-commerce website can have a list of products, which can be cached because its a complex computation.
   But the product in the list can have real time data like price/ratings/comments.

   Now think about the priority and effect of these real time data.

   - Price is critical and should be updated as soon as seller updates the price.
   - Ratings and comments are not so important and can be updated at a later stage.

   Now think about a chat app or stock market app.

   - Stock prices are important and should be updated in real-time.
   - Chat messages are not so important and the refetch interval should be decent.

## Configuration

### Zustand -

The best and ultimate way to manage state in React is to use Zustand. It's extremely lightweight, simple, fast, and easy to use. All you need is create individual slices and combine them together in a single store, make use of react devtools for powerful debugging and finally integrate with immer as a cherry on top to handle state updates and immutability in a clean, readable and predictable way.

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

### Tanstack Query -

An extremely powerful rest api library for React.

The configuration can be globally set for all queries.

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

But ask yourself, is this necessary? These are not just some properties, they can affect the entire application if not done properly. Important things to consider are `Query key`, `Query states`, `staleTime` and `cacheTime`.

- Query key - the key of the query. Must be unique. Avoid arrays or objects because they are referenced.
  use immutable values like strings, numbers, booleans, etc.

- Query States - fresh means the data is cached and stale means otherwise.

- Stale time - the time after which a fetched data is considered stale and will be re fetched.

- Cache time - the time after which cache will be cleared if cached data is no longer used in the app within the given time. for example, if we set it to 10 minutes, then the cache will be cleared after 10 minutes of inactivity of fetched data in the app. Inactivity in react simply means the data is not used by any component that is in viewport.

Remember static data, for that we can use a good and long cache time. this can be like 1hr or 1 day.
But for dynamic data we can use polling with refetchInterval so that tanstack query continuo refetch the data on the given interval. Or else we could use refetchOnMount or refetchOnWindowFocus.

we also have `queryClient.invalidateQueries(["products", id]);` to invalidate a specific query.
but this is not ideal for cached values, because it can affect react router navigation if not done properly.

Also, we can simplify our application and minimize state completely by creating specific endpoints for real time data, like `products/{id}/price` or `products/{id}/ratings`. This can help us break our frontend into extremely smaller chunks and make the application more maintainable and testable.

### Axios -

A powerful library for making HTTP requests in React.

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ORIGIN,
  withCredentials: true, // to allow backend to send and receive cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
```

Axios is better than native fetch because it automatically handles 4xx and 5xx status codes and automatic response parsing, along with other features like cancellation, timeout, interceptors, etc.

## **Putting Everything Together**

1. use zustand to create a global store along with slices.

2. use axios to create simpler apis like below -

   ```javascript
   export const getProduct = async (id) => {
     try {
       const res = await api.get(`/products/${id}`);
       return res.data?.data;
     } catch (e) {
       if (e.response?.status === 401) useStore.getState().logout();
       throw new Error(e.response?.data?.error || "Unknown error occurred.");
     }
   };
   ```

3. use tanstack query to fetch and cache data.

### **Fetching and Caching Data**

Tanstack Query gives you the useQuery hook which handles fetching, caching, and background updates. The key is to use query keys effectively so that data remains cached and doesn't refetch unnecessarily.

```javascript
const { data, isError, isFetching, isFetched } = useQuery({
  queryKey: ["products", id],
  queryFn: () => api(id), // any fn that returns a promise
});
```

**_ important _**

The isError,isFetching,isFetched etc only changes when we directly fetch the data and not when we use the data from cache. So, when using cached data the best way to synchronize store and cache is to use useEffect.
But it should be done carefully because there can be errors and unexpected behavior like rendering unnecessarily. The one thing that changes is the data returned by the query,

```javascript
const setStoreData = useStore((state) => state.products.setProduct);

const { data, isError, isFetching, isFetched } = useQuery({
  queryKey: ["products", id],
  queryFn: () => api(), // any fn that returns a promise
});

useEffect(() => {
  if (isFetched && data) setStoreData(data);
}, [products]);

if (isFetching) return <div>Loading...</div>;

if (isError) return <div>Error</div>;

console.log("Rendering Products");

return <div>{data.description}</div>;
```

You might wonder why we didn't use the store here for products. The reason is that when data is returned
from tanstack query it is stateful and will cause a rerender. so the data from store isn't used in the component to avoid dual renders. The store data can be used by other components that are dependent on it.

We simply fetch in one component, cache it and update the store for other components that depend on it.

Also what about query params and path params ?

for both cases don't use arrays or objects because they are referenced, use immutable values like strings, numbers, booleans, etc.

for path params use query key as `["products", id]`

for query params use query key as

```javascript
const [searchParams] = useSearchParams();
const rating = searchParams.get("rating") || 0;
const search = searchParams.get("search") || "";
const sortBy = searchParams.get("sort_by") || "";
const category = searchParams.get("category") || "";

const { data, isError, isFetched, isFetching } = useQuery({
  queryFn: api,
  queryKey: ["api", search, rating, sortBy, category],
});
```

### **Handling Updates**

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

## Advanced tip - Searching a list of data effectively

This might sound simple but is complex because of synchronization. when we add a search query param to the query key and then use update the search key on typing in an search input field and updating the change via react router dom `const [, setSearchParams] = useSearchParams();` to update current search param value the main issue we will be adding each character typed to the browser history and navigation stack.

Why this is serious?

When we cache this we will cache by each character typed, and not just query but the router dom will also have a similar behavior. when we click back button it will go back to the previous search param value and not to the previous page.

for example if i typed 'gown' in the search field and use setSearchParams to update it, the query we created is watching for the changes and it will be updated like

```javascript
queryKey: ["api", "g"],
queryKey: ["api", "go"],
queryKey: ["api", "gow"],
queryKey: ["api", "gown"],
```

this will cause 4 api calls which is not what we want. similarly for navigation the url will be like

```javascript
/api?search=g
/api?search=go
/api?search=gow
/api?search=gown
```

And so on. The best way to handle this is to debounce the search field value and only update the query key and the url when the search field value is stable. Also we need to handle the search field value along with navigation, both from cache and from backend data. For both this its best to use a global provider that will only contain references using react useRef so that consumers won't un necessarily rerender. We can create a timerRef for debouncing and a searchRef for storing the search field value.

You think that is it, what if we want to show the loading for a good ux. We cant trigger a refetch until we update the query param, so the ui will remain freezed until that giving a bad ux. So, we need to use a separate state like isSearching in the store.

And using this directly within the component that handles the query api is bad idea because it will cayuse flashy and unexpected behavior. So, the best we can do is create a separate absolute positioned component that use the same loader in the component that handles the query api.

eg -

```javascript
<div className="relative">
  <SearchLoader /> absolute positioned
  <Products />
</div>
```

this will make sure that loader will show in both searching and debounced api call and give an illusion of loading to the user which significancy improves ux.
