"use client";

import type { ReactElement, ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";

interface FolderProps {
  name: string;
  label?: ReactElement;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  children?: ReactNode;
}

interface FileProps {
  name: string;
  label?: ReactElement;
  active?: boolean;
}

interface FileTreeProps {
  children: ReactNode;
}

const ctx = createContext(0);

function useIndent() {
  return useContext(ctx);
}

function Ident(): ReactElement {
  const length = useIndent();
  return (
    <>
      {Array.from({ length }, (_, i) => (
        <span key={i} />
      ))}
    </>
  );
}

const FileTree: React.FC<FileTreeProps> & {
  Folder: React.FC<FolderProps>;
  File: React.FC<FileProps>;
} = ({ children }) => {
  return <div>{children}</div>;
};

const Folder: React.FC<FolderProps> = ({ children, name, defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  const indent = useIndent();
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <Ident />
      <div className="cursor-pointer flex items-center gap-2 w-fit hover:text-muted-foreground select-none">
        <svg width="1em" height="1em" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={
              isOpen
                ? "M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v1M5 19h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2Z"
                : "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2Z"
            }
          />
        </svg>
        <div onClick={handleToggle}>{name}</div>
      </div>
      {isOpen && (
        <ul className=" mt-0">
          <ctx.Provider value={indent + 1}>{children}</ctx.Provider>
        </ul>
      )}
    </div>
  );
};

const File: React.FC<FileProps> = ({ name }) => {
  return (
    <div>
      <Ident />
      <div className=" flex items-center gap-2">
        <svg width="1em" height="1em" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"
          />
        </svg>
        {name}
      </div>
    </div>
  );
};

FileTree.Folder = Folder;
FileTree.File = File;

export { FileTree, Folder as FileTreeFolder, File as FileTreeFile };
