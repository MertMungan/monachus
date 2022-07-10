import React from "react";
import "./SlideDrawer.scss";

const SlideDrawer = (props) => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  /**You can use your custom component here to configure block data */
  return <div className={drawerClasses}>{props.content}</div>;
};
export default SlideDrawer;
