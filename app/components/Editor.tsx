//NOT SURE IF THIS IS BEING USED OR NOT??

import React from 'react';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

function MyEditor() {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );
  return <Editor editorState={editorState} onChange={setEditorState} />;
}

export default MyEditor;