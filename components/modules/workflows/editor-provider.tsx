import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";

export interface EditorNode {
  id: string;
  type?: string;
  position: {
      x: number;
      y: number;
  },
  data: Record<string, unknown>
}

interface EditorContextState {
  selectedNode: EditorNode | null;
  setSelectedNode: Dispatch<SetStateAction<EditorNode | null>>;
  connections: {
    GOOGLE_DRIVE: boolean;
    SLACK: boolean;
    DISCORD: boolean;
    NOTION: boolean;
  };
  setConnections: Dispatch<SetStateAction<{
    GOOGLE_DRIVE: boolean;
    SLACK: boolean;
    DISCORD: boolean;
    NOTION: boolean;
}>>
}

const EditorContext = createContext<EditorContextState | null>(null);

export default function EditorProvider({ children }: PropsWithChildren) {
  const [selectedNode, setSelectedNode] = useState<EditorNode | null>(null);
  const [connections, setConnections] = useState({
    GOOGLE_DRIVE: false,
    SLACK: false,
    DISCORD: false,
    NOTION: false,
  })

  return (
    <EditorContext.Provider value={{
      selectedNode,
      setSelectedNode,
      connections,
      setConnections
    }}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  const res = useContext(EditorContext);
  if (!res) throw new Error("Component needs to be wrapped with EditorProvider");
  return res;
}