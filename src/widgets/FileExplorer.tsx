import React, { useState, useEffect } from "react";
import TreeNode from "./TreeNode";

interface FileNode {
  name: string;
  type: FileType;
  id: string;
  size?: string;
  children?: FileNode[];
}

type FileType = "folder" | "file";

interface FileExplorerProps {
  data: FileNode;
  setData: React.Dispatch<React.SetStateAction<FileNode>>;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ data, setData }) => {
  const [treeData, setTreeData] = useState<FileNode>(data);

  useEffect(() => {
    // console.log("Tree data updated:", treeData);
    setTreeData(data);
  }, [data]);

  const handleDelete = (id: string) => {
    // console.log("Deleting i:", id);
    const updatedData = deleteNode(id, treeData);
    if (updatedData) {
      // console.log("Updated tree:", updatedData);
      setTreeData(updatedData);
      setData(updatedData);
    }
  };

  const handleCreateFile = (name: string, parentId: string, size?: string) => {
    if (!name.trim()) {
      alert("Please enter a valid file name.");
      return;
    }
    const isNameExists = treeData.children?.some(
      (child) => child.name === name
    );
    if (isNameExists) {
      alert("A file with the same name already exists.");
      return;
    }
    const updatedData = createFile(name, "file", parentId, size);
    if (updatedData) {
      // console.log("Updated data ", updatedData);
      setTreeData(updatedData);
      setData(updatedData);
    }
  };
  const handleCreateFolder = (name: string, parentId: string) => {
    if (!name.trim()) {
      alert("Please enter a valid folder name.");
      return;
    }
    const isNameExists = treeData.children?.some(
      (child) => child.name === name
    );
    if (isNameExists) {
      alert("A folder with the same name already exists.");
      return;
    }
    // console.log("Creating folder name:", name);
    const updatedData = createFolder(name, parentId);
    if (updatedData) {
      setTreeData(updatedData);
      setData(updatedData);
    }
  };
  const deleteNode = (id: string, node: FileNode): FileNode | undefined => {
    if (!node) return;
    if (node.id === id) {
      return undefined;
    }
    const updatedChildren = node.children
      ?.map((child) => deleteNode(id, child))
      .filter(Boolean);
    if (updatedChildren) {
      return { ...node, children: updatedChildren };
    }
    return node;
  };

  const createFile = (
    name: string,
    type: FileType,
    parentId: string,
    size?: string
  ): FileNode | undefined => {
    const newNode: FileNode = {
      name,
      type,
      id: (Math.random() * 1000000).toFixed(0),
      size,
    };

    function addChildToParent(parent: FileNode): void {
      if (parent.id === parentId) {
        if (!parent.children) parent.children = [];
        parent.children.push(newNode);
        return;
      }
      if (parent.children) {
        parent.children.forEach((child) => {
          addChildToParent(child);
        });
      }
    }

    const updatedTreeData = { ...treeData };
    addChildToParent(updatedTreeData);
    setTreeData(updatedTreeData);
    return updatedTreeData;
  };

  const createFolder = (
    name: string,
    parentId: string
  ): FileNode | undefined => {
    const newFolder: FileNode = {
      name,
      type: "folder",
      id: (Math.random() * 1000000).toFixed(0),
    };

    function findParentNode(currentNode: FileNode): FileNode | undefined {
      if (currentNode.id === parentId) {
        return currentNode;
      }
      if (currentNode.children) {
        for (const childNode of currentNode.children) {
          const foundNode = findParentNode(childNode);
          if (foundNode) {
            return foundNode;
          }
        }
      }
      return undefined;
    }
    const parentNode = findParentNode(treeData);
    if (parentNode) {
      if (!parentNode.children) {
        parentNode.children = [];
      }
      parentNode.children.push(newFolder);
      const updatedTreeData = { ...treeData };
      setTreeData(updatedTreeData);
      return updatedTreeData;
    } else {
      console.log("Parent node not found!");
      return undefined;
    }
  };

  return (
    <TreeNode
      node={treeData}
      onDelete={handleDelete}
      onCreateFile={handleCreateFile}
      onCreateFolder={handleCreateFolder}
    />
  );
};

export default FileExplorer;
