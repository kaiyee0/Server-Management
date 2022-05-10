import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Radio,
  PageHeader,
  Typography,
  Modal,
  Space,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { updateService } from "../api/ServiceReq";
import PopNotification from "../common/Notification";
import { getService, deleteService } from "../api/ServiceReq";
import { FormItemLayout, FormTitleLayout } from "../ui/Layout";

function ModifyServiceForm() {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();
  const { Title } = Typography;
  const { confirm } = Modal;
  useEffect(() => {
    getService(searchParams.get("service_id")).then((res) => {
      console.log(res);
      setDataSource(res);
    });
  }, []);

  if (dataSource.length == 0) {
    return null;
  }

  const formItemLayout = FormItemLayout;
  const formTitleLayout = FormTitleLayout;
  const formSubmitLayout = {
    sm: {
      offset: 17,
    },
  };
  const config = {
    rules: [
      {
        type: "string",
        required: true,
      },
    ],
  };

  function onFinish(values) {
    updateService(values).then((res) => {
      if (res.Result == "200") {
        navigate("/service");
        PopNotification(
          "success",
          "Success",
          "You've successfully updated the service !"
        );
      } else {
        PopNotification(
          "error",
          "Error",
          "Cannot update the service right now..."
        );
        console.log(res);
      }
    });
  }

  function showDeleteConfirm() {
    confirm({
      title: "Are you sure delete this service?",
      content: "All the server belong to this service will be archived too",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteService(searchParams.get("service_id")).then((res) => {
          console.log(res);
          if (res.Result == "200") {
            navigate(-1);
            PopNotification(
              "success",
              "Success",
              "You've successfully archived the service !"
            );
          } else {
            PopNotification(
              "error",
              "Error",
              "Cannot archive the service right now..."
            );
            console.log(res);
          }
        });
      },
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
          ["service_id"]: searchParams.get("service_id"),
          ["service_name"]: dataSource.service_name,
          ["service_owner"]: dataSource.service_owner,
          ["remark"]: dataSource.remark,
        }}
      >
        <Form.Item wrapperCol={formTitleLayout}>
          <Space>
            <Title level={5}>Modify Service</Title>
          </Space>
        </Form.Item>
        <Form.Item label="Service ID" name="service_id">
          <Input placeholder="input service id" disabled={true} />
        </Form.Item>
        <Form.Item label="Service Name" name="service_name">
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
        <Form.Item wrapperCol={formSubmitLayout}>
          <Space>
            <Button danger onClick={showDeleteConfirm}>
              Archive
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}

export default function ModifyService() {
  return <ModifyServiceForm />;
}
