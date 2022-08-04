import React, { Fragment, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Utils as QbUtils } from "react-awesome-query-builder";
import {
  Label,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Breadcrumb,
  CardHeader,
  CardText,
  CardLink,
  ModalHeader,
  ModalBody,
  Modal,
} from "reactstrap";

import { ArrowLeft, CheckCircle } from "react-feather";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig } from './firebaseConfig/FirebaseConfig'
import { getAuth } from "firebase/auth";

import { toast } from 'react-toastify'

import escapeHtml from 'escape-html'
import { createEditor, Transforms, Text, Editor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { connect } from "react-redux";
// REDUX

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]
function RuleFourthStep(props) {
  const { stepper, type, setRuleFourthStep, setWizardOpen, metaEventData, metaRuleData, setSendData } = props;
  const [deneme, setDeneme] = useState("")
  const [editor] = useState(() => withReact(createEditor()))
  const [emailModalShow, setEmailModalShow] = useState(false)
  const [emailTick, setEmailTick] = useState(false)
  const [apiModalShow, setApiModalShow] = useState(false)
  const [apiTick, setApiTick] = useState(false)
  const [firebaseModalShow, setFirebaseModalShow] = useState(false)
  const [firebaseTick, setFirebaseTick] = useState(false)
  const [emailData, setEmailData] = useState({})
  const [apiData, setApiData] = useState({})
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const serialize = (node) => {
    if (Text.isText(node)) {
      let string = escapeHtml(node.text)
      if (node.bold) {
        string = `<strong>${string}</strong>`
      }
      return string
    }

    const children = node.children.map(n => serialize(n)).join('')

    switch (node.type) {
      case 'quote':
        return `<blockquote><p>${children}</p></blockquote>`
      case 'paragraph':
        return `<p>${children}</p>`
      case 'link':
        return `<a href="${escapeHtml(node.url)}">${children}</a>`
      default:
        return children
    }
  }



  const onSubmitEmail = (data) => {
    const editorData = serialize(editor)
    const email = {
      action_type: "email",
      configuration: {
        mailHost: data.mailHost,
        smtpPort: data.smtpPort,
        mailUser: data.mailUser,
        mailPassword: data.password,
        mailToUsers: data.mailToUsers,
        mailCCUsers: data.mailCCUsers,
        mailSubject: data.mailSubject,
        mailBody: editorData
      }
    }
    setEmailData(email)
    setEmailModalShow(false);
    setEmailTick(true)
  };
  const onSubmitApi = (data) => {
    const api = {
      action_type: "api",
      configuration: {
        methods: data.methods,
        apiUrl: data.apiUrl,
        apiKey: data.apiKey,
        apiTemplate: {
          eventRule: data.eventRule,
        },
      }
    }
    setApiData(api)
    setApiModalShow(false);
    setApiTick(true)
  };


  const onSubmitFirebase = (data) => {
    const app = initializeApp(firebaseConfig(data.apiKey, data.projectId, data.senderId, data.appId));
  //   const analytics = getAnalytics(app);
  //   const messaging = getMessaging(app);
  //   const auth = getAuth(app);
    
  //   if (auth) {
  //     toast.success(`Firebase'e bağlantı kuruldu!`);
  //   } else {
  //   toast.warn(`Firebase'e bağlantı kurulamadı!`);
  // }

    setFirebaseModalShow(false);
    setFirebaseTick(true)
  };



  useEffect(() => {
    if (apiData && emailData) {
      const totalData = []
      totalData.push(emailData)
      totalData.push(apiData)
      setRuleFourthStep(totalData)
    }
  }, [emailData, apiData])


  return (
    <Fragment>
      <Modal isOpen={emailModalShow} toggle={() => setEmailModalShow(!emailModalShow)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setEmailModalShow(!emailModalShow)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-3'>
          <h1 className='text-center mb-1'>Email Details</h1>
          <form onSubmit={handleSubmit(onSubmitEmail)}>
            <Label className="form-label" for="condition">Host Mail</Label>
            <input type="text" className="form-control textCustomClass mb-1" placeholder="mailHost" name="mailHost" ref={register({})} />
            <Label className="form-label" for="condition">SMTP Port</Label>
            <input type="number" className="form-control textCustomClass mb-1" placeholder="smtpPort" name="smtpPort" ref={register({})} />
            <Label className="form-label" for="condition">User Mail</Label>
            <input type="email" className="form-control textCustomClass mb-1" placeholder="mailUser" name="mailUser" ref={register({})} />
            <Label className="form-label" for="condition">Mail Password</Label>
            <input type="password" className="form-control textCustomClass mb-1" placeholder="mailPassword" name="mailPassword" ref={register({})} />
            <Label className="form-label" for="condition">Mail To Users</Label>
            <input type="text" className="form-control textCustomClass mb-1" placeholder="mailToUsers" name="mailToUsers" ref={register({})} />
            <Label className="form-label" for="condition">Mail CC Users</Label>
            <input type="text" className="form-control textCustomClass mb-1" placeholder="mailCCUsers" name="mailCCUsers" ref={register({})} />
            <Label className="form-label" for="condition">Mail Subject</Label>
            <input type="text" className="form-control textCustomClass mb-1" placeholder="mailSubject" name="mailSubject" ref={register({})} />
            <Label className="form-label" for="condition">Mail Body</Label>
            {/* <ReactEditorJS onInitialize={handleInitialize} tools={EDITOR_JS_TOOLS}/> */}
            <div style={{ backgroundColor: "white", width: "inherit", height: "300px" }}>
              <Slate editor={editor} value={initialValue}>
                <Editable />
              </Slate>
            </div>
            <Col className="p-0" style={{ textAlign: "right" }}>
              <Button type="submit" className="mt-2" color="primary">Submit</Button>
              <Button className="mt-2" color="primary">Test</Button>
            </Col>
          </form>
        </ModalBody>
      </Modal>
      <Modal isOpen={apiModalShow} toggle={() => setApiModalShow(!apiModalShow)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setApiModalShow(!apiModalShow)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-3'>
          <h1 className='text-center mb-1'>Api Details</h1>
          <form onSubmit={handleSubmit(onSubmitApi)}>
            <Label className="form-label" for="condition">Methods</Label>
            <select
              className="form-control mb-1"
              name="methods"
              id="methods"
              ref={register({ required: true })}
            >
              <option hidden>Select Event</option>
              <option selected key="1" value="POST">POST</option>
              <option key="2" value="PUT">PUT</option>
              <option key="3" value="PATCH">PATCH</option>
            </select>
            <Label className="form-label" for="condition">Api Url</Label>
            <input type="url" className="form-control textCustomClass mb-1" placeholder="apiUrl" name="apiUrl" ref={register({})} />
            <Label className="form-label" for="condition">Api Key</Label>
            <input type="number" className="form-control textCustomClass mb-1" placeholder="apiKey" name="apiKey" ref={register({})} />
            <Label className="form-label" for="condition">Event and Rule</Label>
            <input type="text" className="form-control textCustomClass mb-1" placeholder="eventRule" name="eventRule" defaultValue="Event:{}, Rule:{}" ref={register({})} />
            <Col className="p-0" style={{ textAlign: "right" }}>
              <Button type="submit" className="mt-2" color="primary">Submit</Button>
              <Button className="mt-2" color="primary">Test</Button>
            </Col>
          </form>
        </ModalBody>
      </Modal>
      <Modal isOpen={firebaseModalShow} toggle={() => setFirebaseModalShow(!firebaseModalShow)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setFirebaseModalShow(!firebaseModalShow)}></ModalHeader>
        <ModalBody className='pb-3 px-sm-3'>
          <h1 className='text-center mb-1'>Api Details</h1>
          <form onSubmit={handleSubmit(onSubmitFirebase)}>
            <Label className="form-label" for="condition">Api Key</Label>
            <input type="text" className="form-control textCustomClass mb-1" placeholder="apiKey" name="apiKey" ref={register({})} />
            <Label className="form-label" for="condition">Project Id</Label>
            <input type="text" className="form-control textCustomClass mb-1" placeholder="projectId" name="projectId" ref={register({})} />
            <Label className="form-label" for="condition">Sender Id</Label>
            <input type="text" className="form-control textCustomClass mb-1" placeholder="senderId" name="senderId" ref={register({})} />
            <Label className="form-label" for="condition">App Id</Label>
            <input type="text" className="form-control textCustomClass mb-1" placeholder="appId" name="appId" ref={register({})} />
            <Col className="p-0" style={{ textAlign: "right" }}>
              <Button type="submit" className="mt-2" color="primary">Submit</Button>
              <Button className="mt-2" color="primary">Test</Button>
            </Col>
          </form>
        </ModalBody>
      </Modal>
      <Row>
        <Col xl={4} md={4}>
          <Card className="mb-4 mt-1" style={{ backgroundColor: "white", height: "75%" }}>
            <CardHeader>
              <CardTitle tag="h4">Email</CardTitle>
              {emailTick && <CheckCircle size={18} color="green"></CheckCircle>}
            </CardHeader>
            <CardBody>
              <CardSubtitle className="text-muted mb-1"></CardSubtitle>
              <CardText>
                Send out notifications via email and design them with an
                integrated template editor.
              </CardText>
              <Row style={{ textAlign: "right" }}>
                <Col>
                  <CardLink
                    href="/"
                    onClick={(e) => {
                      setEmailModalShow(true);
                      e.preventDefault();
                    }}
                  >
                    Set
                  </CardLink>
                </Col>
              </Row>

            </CardBody>
          </Card>
        </Col>
        <Col xl={4} md={4}>
          <Card className="mb-4 mt-1" style={{ backgroundColor: "white", height: "75%" }}>
            <CardHeader>
              <CardTitle tag="h4">API</CardTitle>
              {apiTick && <CheckCircle size={18} color="green"></CheckCircle>}
            </CardHeader>
            <CardBody>
              <CardSubtitle className="text-muted mb-1"></CardSubtitle>
              <CardText>
                Pull notifications from the API to show them in your user
                interface.
              </CardText>
              <Row style={{ textAlign: "right" }}>
                <Col>
                  <CardLink
                    href="/"
                    onClick={(e) => {
                      setApiModalShow(true);
                      e.preventDefault();
                    }}
                  >
                    Set
                  </CardLink>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xl={4} md={4}>
          <Card className="mb-4 mt-1" style={{ backgroundColor: "white", height: "75%" }}>
          <CardHeader>
              <CardTitle tag="h4">Firebase</CardTitle>
              {firebaseTick && <CheckCircle size={18} color="green"></CheckCircle>}
            </CardHeader>
            <CardBody>
                <CardSubtitle className="text-muted mb-1"></CardSubtitle>
              <CardText>
                Pull notifications from the API to show them in your user
                interface.
              </CardText>
              <Row style={{ textAlign: "right" }}>
                <Col>
                  <CardLink
                    href="/"
                    onClick={(e) => {
                      setFirebaseModalShow(true);
                      e.preventDefault();
                    }}
                  >
                    Set
                  </CardLink>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <hr />
      <div className="d-flex justify-content-between">
        <Col xs="4">
          <Button
            color="secondary"
            className="btn-prev px-md-3"
            outline
            onClick={() => {
              stepper.previous();
            }}
          >
            <ArrowLeft
              size={14}
              className="align-middle mr-sm-17 mr-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
        </Col>
        <Col xs="8" style={{ textAlign: "end" }}>
          <Button
            color="secondary"
            className="btn mr-1"
            outline
            onClick={() => {
              reset({}), setWizardOpen(false);
            }}
          >
            <span className="align-middle d-sm-inline-block d-none">
              Cancel
            </span>
          </Button>
          <Button color="primary" className="btn-next px-md-3" type="submit" onClick={() => { setSendData(true), setWizardOpen(false) }}>
            <span className="align-middle d-sm-inline-block d-none">
              Save
            </span>
          </Button>
        </Col>
      </div>
    </Fragment>
  );
}

RuleFourthStep.propTypes = {
  stepper: PropTypes.object,
  type: PropTypes.string,
  setRuleFourthStep: PropTypes.func,
  setWizardOpen: PropTypes.func,
  setSendData: PropTypes.func,
  metaEventData: PropTypes.array,
  metaRuleData: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    metaEventData: state.metaDataEventsReducer,
    metaRuleData: state.metaDataRulesReducer,

  };
};

export default connect(mapStateToProps, {})(RuleFourthStep);
