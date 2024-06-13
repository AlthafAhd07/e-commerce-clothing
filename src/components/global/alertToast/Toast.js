import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./toast.css";
import { ReactComponent as CrossIcon } from "../../../images/close-line-icon.svg";

import { selectAlert, showToast } from "../../../features/alert/alertSlice";

const Toast = () => {
  const { toast } = useSelector(selectAlert);

  const dispatch = useDispatch();

  useEffect(() => {
    if (toast.visible === true) {
      setTimeout(() => {
        dispatch(showToast({ visible: false }));
      }, toast?.time ?? 1500);
    }
  }, [toast.visible]);

  return (
    <div
      className="toast"
      data-name={toast.visible}
      style={{
        backgroundColor: `${
          toast.type === "success" ? "rgb(9, 158, 54)" : "rgb(214, 10, 10)"
        }`,
      }}
    >
      <CrossIcon
        className="toast__crossIcon"
        onClick={() => {
          dispatch(showToast({ visible: false }));
        }}
      />
      <p>{toast.msg}</p>
    </div>
  );
};

export default Toast;
