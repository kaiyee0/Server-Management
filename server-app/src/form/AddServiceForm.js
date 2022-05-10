import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Radio, PageHeader, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { addService } from "../api/ServiceReq";
import PopNotification from "../common/Notification";
import { FormItemLayout } from "../ui/Layout";

function AddServiceForm() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { Title } = Typography;

  const formItemLayout = FormItemLayout;
  const config = {
    rules: [
      {
        type: "string",
        required: true,
      },
    ],
  };

  function onFinish(values) {
    addService(values).then((res) => {
      if (res.Result == "200") {
        navigate(-1);
        PopNotification(
          "success",
          "Success",
          "You've successfully added a service !"
        );
      } else {
        PopNotification(
          "error",
          "Error",
          "Cannot insert a service right now..."
        );
        console.log(res);
      }
    });
  }

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(-1)}
        title=" "
      />
      <Form {...formItemLayout} form={form} onFinish={onFinish}>
        <Form.Item
          wrapperCol={{
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 1,
            },
          }}
        >
          <Title level={5}>Add Service</Title>
        </Form.Item>
        <Form.Item label="Service Name" name="service_name" {...config}>
          <Input placeholder="input server url" />
        </Form.Item>

        <Form.Item label="Service Owner" name="service_owner" {...config}>
          <Radio.Group>
            <Radio.Button value="Dennis">Dennis</Radio.Button>
            <Radio.Button value="Eason">Eason</Radio.Button>
            <Radio.Button value="Eric Kuo">Eric Kuo</Radio.Button>
            <Radio.Button value="Eric Liao">Eric Liao</Radio.Button>
            <Radio.Button value="Kay">Kay</Radio.Button>
            <Radio.Button value="Roy">Roy</Radio.Button>
            <Radio.Button value="UL">UL</Radio.Button>
            <Radio.Button value="Vivi">Vivi</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Remark" name="remark">
          <TextArea placeholder="input remark if needed" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: {
              span: 24,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 17,
            },
          }}
        >
          <Button
            style={{ marginLeft: "auto" }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default function AddService() {
  return <AddServiceForm />;
}
