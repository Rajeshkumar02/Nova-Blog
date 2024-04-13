import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import { FileTree, FileTreeFile, FileTreeFolder } from "./file-tree";
import { TimeLine } from "./time-line";
import Navigate from "./navigate";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
  FileTree,
  FileTreeFolder,
  FileTreeFile,
  TimeLine,
  Navigate,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
