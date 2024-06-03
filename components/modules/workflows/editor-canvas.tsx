"use client";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import 'reactflow/dist/style.css';
import FlowEditor from './flow-editor';
import FlowEditorActions from './flow-editor-actions';
import FlowEditorSidebar from './flow-editor-sidebar';
import EditorProvider from './editor-provider';

export default function EditorCanvas() {
  return (
    <EditorProvider>
      <div className='h-full'>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            <FlowEditor />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={30}
          >
            <FlowEditorActions />
            <FlowEditorSidebar />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </EditorProvider>
  )
}