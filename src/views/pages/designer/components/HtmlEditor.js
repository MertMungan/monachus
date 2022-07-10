
import React, {useState, useEffect} from 'react'
import { useSkin } from '@hooks/useSkin'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Row, Col } from "reactstrap";

function HtmlEditor({ data = "", setData = () => {}}) {
  const [skin, setSkin] = useSkin()
  const [editorData, setEditorData] = useState("")

  return (
    <Col xs={6} md={6} className="p-0">
    <CodeMirror
      value={data}
      height="100%"
      theme= {skin === "dark" ?'dark' : 'light'}
      placeholder= 'deneme'
      extensions={[javascript({ jsx: true })]}
      onChange={(value, viewUpdate) => {
        setData(value);
      }}
    />
    </Col>
  )
}

export default HtmlEditor