import React, { useState } from "react";
import { FileSidebar } from "../File/FileSideBar";
import SearchComponent from "./FileSidebarSearch";
import { DBQueryResult } from "electron/main/database/Schema";
import { FileInfoTree } from "electron/main/Files/Types";
import { ChatList } from "../Chat/ChatsSidebar";
import { ChatHistory } from "electron/main/Store/storeConfig";
import { SidebarAbleToShow } from "../FileEditorContainer";

interface SidebarManagerProps {
  files: FileInfoTree;
  expandedDirectories: Map<string, boolean>;
  handleDirectoryToggle: (path: string) => void;
  selectedFilePath: string | null;
  onFileSelect: (path: string) => void;
  sidebarShowing: SidebarAbleToShow;
  renameFile: (oldFilePath: string, newFilePath: string) => Promise<void>;
  noteToBeRenamed: string;
  setNoteToBeRenamed: (note: string) => void;
  fileDirToBeRenamed: string;
  setFileDirToBeRenamed: (dir: string) => void;
  allChatHistories: ChatHistory[];
  setCurrentChatHistory: (chat: ChatHistory | undefined) => void;
}

const SidebarManager: React.FC<SidebarManagerProps> = ({
  files,
  expandedDirectories,
  handleDirectoryToggle,
  selectedFilePath,
  onFileSelect,
  sidebarShowing,
  renameFile,
  noteToBeRenamed,
  setNoteToBeRenamed,
  fileDirToBeRenamed,
  setFileDirToBeRenamed,
  allChatHistories,
  setCurrentChatHistory,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<DBQueryResult[]>([]);

  return (
    <div className="w-full">
      {sidebarShowing === "files" && (
        <FileSidebar
          files={files}
          expandedDirectories={expandedDirectories}
          handleDirectoryToggle={handleDirectoryToggle}
          selectedFilePath={selectedFilePath}
          onFileSelect={onFileSelect}
          renameFile={renameFile}
          noteToBeRenamed={noteToBeRenamed}
          setNoteToBeRenamed={setNoteToBeRenamed}
          fileDirToBeRenamed={fileDirToBeRenamed}
          setFileDirToBeRenamed={setFileDirToBeRenamed}
        />
      )}
      {sidebarShowing === "search" && (
        <SearchComponent
          onFileSelect={onFileSelect}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
      )}

      {sidebarShowing === "chats" && (
        <ChatList
          chatIDs={allChatHistories?.map((chat) => chat.id) || []}
          onSelect={(chatID) => {
            const selectedChat = allChatHistories?.find(
              (chat) => chat.id === chatID
            );
            setCurrentChatHistory(selectedChat);
          }}
        />
      )}
    </div>
  );
};

export default SidebarManager;
