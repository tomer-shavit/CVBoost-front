export const BoostCta: React.FC<{ cta?: string }> = ({
  cta = "Try for free",
}) => {
  return (
    <a
      href="/boost"
      aria-label="get started button"
      className="flex w-52 justify-center rounded-full bg-primary px-7.5 py-2.5 text-center text-xl font-semibold text-white duration-300 ease-in-out hover:bg-blackho dark:bg-primary dark:hover:bg-blackho"
    >
      {cta}
    </a>
  );
};
