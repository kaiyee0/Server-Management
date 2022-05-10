import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Radio, PageHeader, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { getServer, updateServer } from "../api/ServerReq";
import PopNotification from "../common/Notification";
import { FormItemLayout } from "../ui/Layout";

function AddServerForm() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { Title } = Typography;
  const [dataSource, setDataSource] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    getServer(searchParams.get("server_id")).then((res) => {
      console.log(res);
      setDataSource(res);
    });
  }, []);

  if (dataSource.length == 0) {
    return null;
  }

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
    updateServer(values).then((res) => {
      if (res.Result == "200") {
        navigate(-1);
        PopNotification(
          "success",
          "Success",
          "You've successfully added a server !"
        );
      } else {
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
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        initialValues={{
          ["server_id"]: searchParams.get("server_id"),
          ["service_id"]: dataSource.service_id,
          ["server_url"]: dataSource.server_url,
          ["server_env"]: dataSource.server_env,
          ["server_type"]: dataSource.server_type + "",
          ["login_account"]: dataSource.login_account,
          ["login_password"]: dataSource.login_password,
          ["login_protocol"]: dataSource.login_protocol,
          ["remark"]: dataSource.remark,
        }}
      >
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
          <Title level={5}>Modify Server</Title>
        </Form.Item>
        <Form.Item label="Server ID" name="server_id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Service ID" name="service_id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Server URL" name="server_url" {...config}>
          <Input placeholder="input server url" />
        </Form.Item>

        <Form.Item label="Environment" name="server_env" {...config}>
          <Radio.Group>
            <Radio.Button value="sit">sit</Radio.Button>
            <Radio.Button value="uat">uat</Radio.Button>
            <Radio.Button value="stage">stage</Radio.Button>
            <Radio.Button value="prod">prod</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Server Type" name="server_type" {...config}>
          <Radio.Group>
            <Radio.Button value="1">Main Service</Radio.Button>
            <Radio.Button value="2">Database</Radio.Button>
            <Radio.Button value="3">Kafka</Radio.Button>
            <Radio.Button value="4">Redis</Radio.Button>
            <Radio.Button value="5">Others</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Login Account" name="login_account" {...config}>
          <Input placeholder="input login account" />
        </Form.Item>
        <Form.Item label="Login Password" name="login_password" {...config}>
          <Input placeholder="input login password" />
        </Form.Item>
        <Form.Item label="Login Protocol" name="login_protocol">
          <Input placeholder="input login protocol, i.e., ssh" />
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
              offset: 19,
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

export default function ModifyServer() {
  return <AddServerForm />;
}
