import React, { Fragment, useState, useEffect } from "react";
import { Label } from "reactstrap";
import Flatpickr from "react-flatpickr";

const DatePicker = ({ getDate = () => {} }) => {
  const [picker, setPicker] = useState(new Date());

  return (
    <Fragment>
      <Flatpickr
        value={picker}
        id="hf-picker"
        className="form-control"
        onChange={(date) => setPicker(date)}
        options={{
          altInput: true,
          altFormat: "F j, Y",
          dateFormat: "Y-m-d",
        }}
      />
    </Fragment>
  );
};

export default DatePicker;
