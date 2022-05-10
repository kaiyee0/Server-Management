import { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Descriptions,
  Badge,
  Input,
  Space,
  Button,
  Modal,
  Row,
  Col,
  Typography,
  PageHeader,
} from "antd";
import PopNotification from "../common/Notification";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { getServiceDetail } from "../api/ServiceReq";
import { deleteServer } from "../api/ServerReq";
import { getServiceTypeByNumber } from "../util/ServiceType";
function ServiceDescription() {
  const [dataSource, setDataSource] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { Title } = Typography;
  const { confirm } = Modal;

  useEffect(() => {
    getServiceDetail(searchParams.get("service_id")).then((res) => {
      console.log(res);
      setDataSource(res);
    });
  }, []);
  if (dataSource.length == 0) {
    return null;
  }

  const serverColumns = [
    {
      title: "Type",
      dataIndex: "server_type",
      key: "type",
      render: (type) => getServiceTypeByNumber(type),
      filters: [
        {
          text: "Main Service",
          value: 1,
        },
        {
          text: "Database",
          value: 2,
        },
        {
          text: "Kafka",
          value: 3,
        },
        {
          text: "Redis",
          value: 4,
        },
        {
          text: "Others",
          value: 5,
        },
      ],
      onFilter: (value, record) => record.server_type == value,
    },
    {
      title: "Env",
      dataIndex: "server_env",
      key: "env",
      render: (env) => {
        let color = "";
        switch (env) {
          case "sit":
            color = "blue";
            break;
          case "uat":
            color = "orange";
            break;
          case "prod":
            color = "green";
            break;
          default:
            color = "gray";
            break;
        }
        return (
          <Tag color={color} key={env}>
            {env.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        {
          text: "SIT",
          value: "sit",
        },
        {
          text: "UAT",
          value: "uat",
        },
        {
          text: "STAGE",
          value: "stage",
        },
        {
          text: "PROD",
          value: "prod",
        },
      ],
      onFilter: (value, record) => record.server_env.indexOf(value) === 0,
    },
    {
      title: "URL",
      dataIndex: "server_url",
      key: "url",
    },
    {
      title: "Login",
      dataIndex: ["login_account", "login_password"],
      key: "login",
      render: (text, row) => {
        return row.login_account + " / " + row.login_password;
      },
    },
    {
      title: "Login Protocol",
      dataIndex: "login_protocol",
      key: "protocol",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
    },
    {
      title: "More",
      dataIndex: "server_id",
      key: "more",
      render: (server_id) => {
        const modifyServerLink =
          "/service/server/modify?server_id=" + server_id;
        return (
          <span>
            <Link to={modifyServerLink}>
              <Tag color="orange">Modify </Tag>
            </Link>
            <span className="ant-divider" />
            <Tag
              color="red"
              onClick={() => showDeleteConfirm(server_id)}
              style={{ cursor: "pointer" }}
            >
              Delete
            </Tag>
          </span>
        );
      },
    },
  ];

  const COLUMNS = [
    {
      title: "Name",
      dataIndex: "service_name",
      key: "name",
    },
    {
      title: "Owner",
      dataIndex: "service_owner",
      key: "owner",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      render: (remark) => {
        console.log(remark);
        if (remark == null || remark == "") {
          return "none";
        }
        return remark;
      },
    },
    {
      title: "Create Time",
      dataIndex: "create_at",
      key: "create_at",
      render: (datetime) => {
        if (datetime !== "undefined") {
          return datetime.split(" ")[0];
        }
      },
    },
    {
      title: "Update Time",
      dataIndex: "update_at",
      key: "update_at",
      render: (datetime) => {
        if (datetime !== "undefined") {
          return datetime.split(" ")[0];
        }
      },
    },
    {
      title: "More",
      dataIndex: "service_id",
      key: "operation",
      fixed: "right",
      width: 250,
      render: (service_id) => {
        const addServerLink = "/service/server/add?service_id=" + service_id;
        const viewServerLink = "/service/detail?service_id=" + service_id;
        return (
          <span>
            <Link to={addServerLink}>
              <Tag color="green">Add Server </Tag>
            </Link>
            <span className="ant-divider" />
            <Link to={viewServerLink}>
              <Tag color="blue">View </Tag>
            </Link>
            <span className="ant-divider" />
            <a href="#">
              <Tag color="orange">Modify </Tag>{" "}
            </a>
          </span>
        );
      },
    },
  ];

  const addServerLink =
    "/service/server/add?service_id=" + searchParams.get("service_id");
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(-1)}
        title=" "
      />
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Descriptions title="Service Info" layout="vertical" bordered>
          <Descriptions.Item label="Service Name">
            {dataSource.service_name}
          </Descriptions.Item>
          <Descriptions.Item label="Service Owner">
            {dataSource.service_owner}
          </Descriptions.Item>
          <Descriptions.Item label="Service ID">
            {dataSource.service_id}
          </Descriptions.Item>
          <Descriptions.Item label="Create At">
            {dataSource.create_at}
          </Descriptions.Item>
          <Descriptions.Item label="Update At">
            {dataSource.update_at}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Badge status="success" text="Running" />
          </Descriptions.Item>
          <Descriptions.Item label="Remark">
            {dataSource.remark}
          </Descriptions.Item>
        </Descriptions>
        <Row>
          <Col span={18}>
            <Title level={5}>Server Info</Title>
          </Col>
          <Col span={6}>
            <Link to={addServerLink}>
              <Button type="Default" style={{ float: "right" }}>
                Add Server
              </Button>
            </Link>
          </Col>
        </Row>

        <Table
          columns={serverColumns}
          dataSource={dataSource.server_list}
          rowKey={(server) => server.server_id}
        />
      </Space>
    </>
  );

  function showDeleteConfirm(server_id) {
    confirm({
      title: "Are you sure delete this service?",
      content: "All the server belong to this service will be archived too",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteServer(server_id).then((res) => {
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
}
export default function ViewServiceDetail() {
  return <ServiceDescription />;
}
