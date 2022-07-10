import React, { useState, useEffect } from "react";
import { Row, Col, Label } from "reactstrap";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useSkin } from "@hooks/useSkin";
import { fetchMessagingTemplates } from "../../../../../redux/actions/notificationMessagingTemplates";
let currentSkin = "dark";

const SlideMonachusSms = ({
  smsData = [],
  fetchMessagingTemplates = () => {},
  selectedBlockType = "",
  selectedBlockId = "",
}) => {
  const [currentSmsData, setCurrentSmsData] = useState([]);
  const [skin, setSkin] = useSkin();
  // console.log("selectedBlockType SMS", selectedBlockType);
  // console.log("selectedBlockId SMS", selectedBlockId);
  currentSkin = skin;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // console.log("smsData", smsData);

    if (smsData.length > 0) {
      // console.log("smsData", smsData);
      const currentSmsNames = smsData.map((sms) => {
        return {
          id: sms.id,
          name: sms.name,
        };
      });
      setCurrentSmsData(currentSmsNames);
    }
  }, [smsData]);

  useEffect(() => {
    fetchMessagingTemplates();
  }, []);
  const onSubmit = (data) => {
    // console.log("onSubmit", data);
  };
  return (
    <Row
      tag="form"
      className="gy-1 gx-2 m-0"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        backgroundColor: skin === "dark" ? "#161d31" : "#f8f8f8",
      }}
    >
      {" "}
      <Col xs={12} md={12}>
        <Label className="form-label" for="journeySmsSelect">
          Template
        </Label>
        <select
          name="journeySmsSelect"
          ref={register}
          className="form-control textCustomClass mb-1"
        >
          <>
            {currentSmsData.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </>
        </select>
        <Label className="form-label" for="name">
          Name
        </Label>
        <input
          type="text"
          className="form-control textCustomClass"
          id="name"
          name="name"
          ref={register({ required: true })}
        />

        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            name="primaryEnable"
            id="primaryEnable"
            data-toggle="toggle"
            ref={register({})}
          />
          <label className="custom-control-label" htmlFor="primaryEnable">
            Primary
          </label>
        </div>

        <Label className="form-label" for="credentials">
          Templates
        </Label>
        <input
          type="textarea"
          className="form-control textCustomClass mb-1"
          placeholder="{{notification.subject}}"
          name="templates"
          ref={register({ required: true })}
        />
      </Col>
      <Button color="primary" type="submit">
        Submit
      </Button>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    smsData: state.messagingTemplatesReducer,
  }; // PROP!!!!! collectionList !!!
};
export default connect(mapStateToProps, { fetchMessagingTemplates })(
  SlideMonachusSms
);
