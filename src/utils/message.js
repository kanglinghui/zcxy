import { ElMessage } from "element-plus";
export const $msg = (params) => {
  const { type, msg } = params;
  switch (type) {
    case "success":
      ElMessage({
        type: "success",
        message: msg,
        offset: 5,
        showClose: true,
      });
      break;
    case "warning":
      ElMessage({
        type: "warning",
        message: msg,
        offset: 5,
        showClose: true,
      });
      break;
    case "info":
      ElMessage({
        message: msg,
        offset: 5,
        showClose: true,
      });
      break;
    default:
      ElMessage({
        type: "error",
        message: msg,
        offset: 5,
        showClose: true,
      });
  }
};
