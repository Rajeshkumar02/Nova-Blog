import React, { useState, ReactNode } from "react";

interface FolderStructureProps {
  children?: ReactNode;
}

interface FolderProps {
  name: string;
  defaultOpen?: boolean;
  children?: ReactNode;
}

interface FileProps {
  name: string;
}

const FolderStructure: React.FC<FolderStructureProps> = ({ children }) => {
  return <ul>{children}</ul>;
};

const Folder: React.FC<FolderProps> = ({
  name,
  defaultOpen = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <span onClick={handleToggle}>{name}</span>
      {isOpen && <ul>{children}</ul>}
    </li>
  );
};

const File: React.FC<FileProps> = ({ name }) => {
  return <li>{name}</li>;
};

export { FolderStructure, Folder, File, type FolderProps, type FileProps };
