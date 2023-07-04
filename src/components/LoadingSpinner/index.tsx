export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
      <label className="mt-2 text-base text-blue-700">Carregando...</label>
    </div>
  );
};
