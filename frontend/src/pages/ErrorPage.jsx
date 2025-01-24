export default function ErrorPage() {
  return (
    <section className="bg-primary text-primary">
      <main className="min-w-[320px] h-screen overflow-auto">
        <div className="flex items-center justify-center size-full">
          <div className="flex flex-col items-center gap-5 text-center">
            <h1 className="text-2xl text-bold">Something went wrong</h1>

            <p className="font-semibold text-tertiary">
              There&apos;s an issue and the page could not be loaded.
            </p>

            <button
              type="button"
              className="w-[160px] xs:w-full"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
