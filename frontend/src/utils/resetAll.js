import queryClient from "config/queryClientConfig";

export default function resetAll() {
  queryClient.clear();
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload();
}
