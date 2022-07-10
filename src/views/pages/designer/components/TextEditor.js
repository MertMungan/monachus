/*eslint-disable */

import React, { useState, useEffect, useRef } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tools";
import EditorJS from "@editorjs/editorjs";

import "@styles/react/libs/editor/editor.scss";

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "This is my awesome editor!",
          level: 1,
        },
      },
    ],
  };
};

const EDITTOR_HOLDER_ID = "editorjs";

const EditorControlled = (props) => {
  const [value, setValue] = useState(EditorState.createEmpty());
  const ReactEditorJS = createReactEditorJS();
  const ejInstance = useRef();
  const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);
  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: "ERROR",
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        let content = await editor.saver.save();
        // Put your logic here to save this data to your DB
        setEditorData(content);
      },
      autofocus: true,
      tools: {
        header: EDITOR_JS_TOOLS.header,
        paragraph: EDITOR_JS_TOOLS.paragraph,
        embed: EDITOR_JS_TOOLS.embed,
        table: EDITOR_JS_TOOLS.table,
        list: EDITOR_JS_TOOLS.list,
        warning: EDITOR_JS_TOOLS.warning,
        code: EDITOR_JS_TOOLS.code,
        linkTool: EDITOR_JS_TOOLS.linkTool,
        image: EDITOR_JS_TOOLS.image,
        raw: EDITOR_JS_TOOLS.raw,
        quote: EDITOR_JS_TOOLS.quote,
        marker: EDITOR_JS_TOOLS.marker,
        checklist: EDITOR_JS_TOOLS.checklist,
        delimiter: EDITOR_JS_TOOLS.delimiter,
        inlineCode: EDITOR_JS_TOOLS.inlineCode,
        simpleImage: EDITOR_JS_TOOLS.simpleImage,
      },
    });
  };
  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current.destroy();
      ejInstance.current = null;
    };
  }, []);

  useEffect(() => {
    // console.log("editorData", editorData.blocks);
  }, [editorData]);
  return (
    <>
      {/*         <Editor editorState={data} onEditorStateChange={data => setData(data)} />
       */}
      <div id={EDITTOR_HOLDER_ID}> </div>
    </>
  );
};

export default EditorControlled;
/*eslint-disable */
