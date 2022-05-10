import { notification } from "antd";
function PopNotification(type, title, message) {
  notification[type]({
    message: title,
    description: message,
  });
}
export default PopNotification;
