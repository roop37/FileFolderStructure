import React, { useState } from "react";

interface TreeNodeProps {
  node: FileNode;
  onDelete: (id: string) => void;
  onCreateFile: (name: string, parentId: string, size?: string) => void;
  onCreateFolder: (name: string, parentId: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  onDelete,
  onCreateFile,
  onCreateFolder,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    onDelete(node.id);
  };

  const handleCreateFile = () => {
    const name = prompt("Enter file name:") || "";
    const size = prompt("Enter file size:") || "";
    onCreateFile(name, node.id, size);
  };

  const handleCreateFolder = () => {
    const name = prompt("Enter folder name:") || "";
    onCreateFolder(name, node.id);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{ marginLeft: "10px", marginBottom: "5px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          //   backgroundColor: node.type === "folder" ? "#F0F0F0" : "#FFFFFF",
          padding: "5px",
        }}
      >
        <button onClick={toggleExpand}>{isExpanded ? "-" : "+"}</button>
        <span>{node.name}</span>
        {(node.type === "folder" || node.type === "file") && (
          <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        )}
        {node.type === "folder" && (
          <>
            <button onClick={handleCreateFile} style={{ marginLeft: "10px" }}>
              Create File
            </button>
            <button onClick={handleCreateFolder} style={{ marginLeft: "10px" }}>
              Create Folder
            </button>
          </>
        )}
      </div>
      {isExpanded && node.children && (
        <div style={{ marginLeft: "20px" }}>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onDelete={onDelete}
              onCreateFile={onCreateFile}
              onCreateFolder={onCreateFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
