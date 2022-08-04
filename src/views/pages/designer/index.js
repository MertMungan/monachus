import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Label,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
  Card,
  CardBody,
} from "reactstrap";
import HtmlEditor from "./components/HtmlEditor";
import EditorControlled from "./components/TextEditor";
import { useSkin } from "@hooks/useSkin";
import { fetchEmailTemplateData } from "../../../redux/actions/notificationEmailTemplates";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { EditorState, convertToRaw } from "draft-js";

import { EDITOR_JS_TOOLS } from "./components/tools";
import EditorJS from "@editorjs/editorjs";
import "./editor.css";

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "Build your template!",
          level: 1,
        },
      },
    ],
  };
};

const EDITTOR_HOLDER_ID = "editorjs";

function index({ emailTemplatesData = [], fetchEmailTemplateData = () => {} }) {
  const [skin, setSkin] = useSkin();

  const [mustacheOutput, setMustacheOutput] = useState("");

  const [error, setError] = useState("");
  const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);
  const [emailData, setEmailData] = useState([]);
  const ejInstance = useRef();

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
      tools: {
        header: EDITOR_JS_TOOLS.header,
        paragraph: EDITOR_JS_TOOLS.paragraph,
        embed: EDITOR_JS_TOOLS.embed,
        table: EDITOR_JS_TOOLS.table,
        list: EDITOR_JS_TOOLS.list,
        warning: EDITOR_JS_TOOLS.warning,
        code: EDITOR_JS_TOOLS.code,
        linkTool: EDITOR_JS_TOOLS.linkTool,
        image: {
          class: EDITOR_JS_TOOLS.image,
          inlineToolbar: true,
          config: {
            embed: {
              display: true,
            },
            unsplash: {
              appName: "monachus",
              clientId: "3BV7Eu3c0CSgcAL2lYSGoWJl13x_bpr8tu7gNjC82JE",
            },
          },
        },
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
    fetchEmailTemplateData();
  }, []);

  // emailTemplate'ları çek
  // emailTemplate'ı seçtir (oğuz)
  // oğuz'un içine newData'yı göm
  // akif abinin tarafına oğuz'un yeni hâlini yolla

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.emailBody = editorData;
    // console.log(data);
  };

  useEffect(() => {
    setEmailData(emailTemplatesData);
  }, [emailTemplatesData]);
  /*   const handleMustache = () => {
    var view = {
      title: "Joe",
    }
    try {
      var output = Mustache.render(textData, view);
      console.log("output", output)
      setMustacheOutput(output)
      setError()
    } catch (error) {
      setError("Please Check Your Curly Braces")
    }
  } */

  return (
    <>
      <form className="form-label" onSubmit={handleSubmit(onSubmit)}>
        <Row className="d-flex ">
          <Col xs={2} md={2}>
            <select
              className="form-control textCustomClass mb-1"
              name="emailName"
              ref={register({})}
            >
              {emailData.map((email) => (
                <option key={email.id} value={email.id}>
                  {email.name === null ? "Unnamed" : email.name}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Card
          style={{
            color: skin === "dark" ? "white" : "black",
            outline: "1px solid #e0e0e0",
          }}
        >
          <CardBody id={EDITTOR_HOLDER_ID}></CardBody>
        </Card>
        <button type="submit" className="btn btn-primary">
          {" "}
          Gönder{" "}
        </button>
      </form>
    </>
  );
}

const mapStateToProps = (state) => {
  return { emailTemplatesData: state.notificationEmailTemplatesReducer }; // PROP!!!!! collectionList !!!
};

export default connect(mapStateToProps, { fetchEmailTemplateData })(index);
