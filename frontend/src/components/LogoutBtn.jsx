import { useMutation } from "@tanstack/react-query";

import { logoutUser } from "api/authApi";
import resetAll from "utils/resetAll";

export default function LogoutBtn() {
  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: resetAll,
  });

  return (
    <button
      type="button"
      className="text-sm text-white"
      onClick={() => mutation.mutate()}
    >
      <img
        alt="home"
        className="pt-1.5 xs:hidden size-6"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
      />
      <span className="hidden xs:inline">Logout</span>
    </button>
  );
}
