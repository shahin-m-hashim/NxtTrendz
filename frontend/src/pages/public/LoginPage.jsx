import { cn } from "utils/cn";
import useStore from "store/_store";
import { loginUser } from "api/loginUser";
import { useShallow } from "zustand/shallow";
import { useMutation } from "@tanstack/react-query";

export default function LoginPage() {
  const [
    loginForm,
    resetLoginForm,
    setLoginFormField,
    setLoginFormError,
    setIsLoginFormSubmitting,
  ] = useStore(
    useShallow((state) => [
      state.forms.login,
      state.resetLoginForm,
      state.setLoginFormField,
      state.setLoginFormError,
      state.setIsLoginFormSubmitting,
    ])
  );

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => resetLoginForm(),
    onMutate: () => setIsLoginFormSubmitting(true),
    onError: (e) => setLoginFormError(e.response.data.error),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      username: loginForm.username,
      password: loginForm.password,
    });
  };

  const isDisabled = !loginForm.isValid || loginForm.isSubmitting;

  return (
    <section className="h-screen min-w-[320px]">
      <main className="flex flex-col items-center justify-center p-5 md:p-0 md:flex-row size-full">
        <div className="flex flex-col items-center justify-center flex-1 gap-5 md:items-end">
          <img
            alt="website logo"
            className="w-1/2 md:hidden"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          />

          <img
            alt="website login"
            className="p-5 lg:w-3/4"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          />
        </div>

        <div className="flex flex-col justify-center flex-1 w-full md:items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full gap-5 shadow-lg md:p-10 md:w-3/4 xl:w-1/2"
          >
            <img
              alt="website logo"
              className="hidden w-1/2 md:block"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            />

            <div className="flex flex-col w-full gap-2">
              <label
                htmlFor="username"
                className="font-semibold text-[#475569]"
              >
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="off"
                value={loginForm.username}
                placeholder="Username"
                className="w-full p-2 bg-[#e2e8f0] rounded-md"
                onChange={(e) => setLoginFormField("username", e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label
                htmlFor="password"
                className="font-semibold text-[#475569]"
              >
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={loginForm.password}
                placeholder="Password"
                className="w-full p-2 bg-[#e2e8f0] rounded-md"
                onChange={(e) => setLoginFormField("password", e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className={cn(
                "bg-[#0b69ff] w-full p-2 text-white rounded-md",
                isDisabled && "opacity-60 cursor-not-allowed"
              )}
            >
              Login
            </button>

            {loginForm.error && (
              <p className="text-[#ff0b37] text-center">{loginForm.error}</p>
            )}
          </form>
        </div>
      </main>
    </section>
  );
}
