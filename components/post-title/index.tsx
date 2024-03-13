import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className=" text-3xl font-semibold tracking-tighter leading-tight md:leading-none mb-6 text-center md:text-left">
      {children}
    </h1>
  );
}
