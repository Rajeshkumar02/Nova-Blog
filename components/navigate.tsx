import Link from "next/link";

const Navigate = ({ path, label }: { path: string; label: string }) => {
  return (
    <Link
      className=" hover:text-primary hover:underline no-underline font-bold"
      href={path}
    >
      {label}
    </Link>
  );
};

export default Navigate;
