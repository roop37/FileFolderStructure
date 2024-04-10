import React, { useState } from "react";
import FileExplorer from "./widgets/FileExplorer";

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

const AppWrapper: React.FC = () => {
  const [dummyData, setDummyData] = useState<FileNode>({
    name: "root",
    type: "folder",
    id: "1",
    children: [
      {
        name: "documents",
        type: "folder",
        id: "2",
        children: [
          {
            name: "work",
            type: "folder",
            id: "3",
            children: [
              {
                name: "report.docx",
                type: "file",
                size: "256 KB",
                id: "4",
              },
              {
                name: "presentation.pptx",
                type: "file",
                size: "1.2 MB",
                id: "5",
              },
            ],
          },
          {
            name: "personal",
            type: "folder",
            id: "6",
            children: [
              {
                name: "resume.pdf",
                type: "file",
                size: "512 KB",
                id: "7",
              },
              {
                name: "travel_plans.doc",
                type: "file",
                size: "128 KB",
                id: "8",
              },
            ],
          },
        ],
      },
      {
        name: "photos",
        type: "folder",
        id: "9",
        children: [
          {
            name: "vacation",
            type: "folder",
            id: "10",
            children: [
              {
                name: "beach.jpg",
                type: "file",
                size: "2.5 MB",
                id: "11",
              },
              {
                name: "mountains.jpg",
                type: "file",
                size: "3.1 MB",
                id: "12",
              },
            ],
          },
          {
            name: "family",
            type: "folder",
            id: "13",
            children: [
              {
                name: "birthday.jpg",
                type: "file",
                size: "1.8 MB",
                id: "14",
              },
              {
                name: "holiday.jpg",
                type: "file",
                size: "2.2 MB",
                id: "15",
              },
            ],
          },
        ],
      },
    ],
  });

  return <App data={dummyData} setData={setDummyData} />;
};

const App: React.FC<FileExplorerProps> = ({ data, setData }) => {
  return <FileExplorer data={data} setData={setData} />;
};

export default AppWrapper;
