const initialAuth = JSON.parse(localStorage.getItem("auth")) || {
  loggedInAt: "",
  sessionId: null,
  isAuthenticated: false,
};

const createAuthSlice = (set) => ({
  auth: initialAuth,

  login: () => {
    set(
      (state) => {
        state.auth.isAuthenticated = true;
        state.auth.loggedInAt = Date.now();
        state.auth.sessionId = crypto.randomUUID();
        localStorage.setItem("auth", JSON.stringify(state.auth));
      },
      undefined,
      "login"
    );
  },

  logout: () => {
    set(
      (state) => {
        state.auth = initialAuth;
        localStorage.removeItem("auth");
      },
      undefined,
      "logout"
    );
  },
});

export default createAuthSlice;
