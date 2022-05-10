import { useState, useEffect } from "react";
import { Table, Tag, Input, Space, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";

import { getAllService } from "../api/ServiceReq";

function FilterableServiceTable() {
  const [filterText, setFilterText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    getAllService().then((res) => {
      setDataSource(res);
      setFilterData(res);
    });
  }, []);
  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Row>
        <Col span={18}>
          <SearchBar
            filterText={filterText}
            onFilterTextChange={setFilterText}
            origDataSource={dataSource}
            setFilterData={setFilterData}
          />
        </Col>
        <Col span={6}>
          <Link to="/service/add">
            <Button type="Default" style={{ float: "right" }}>
              Add Service
            </Button>
          </Link>
        </Col>
      </Row>
      <Table
        columns={COLUMNS}
        dataSource={filterData}
        rowKey={(record) => record.service_id}
      />
    </Space>
  );
}

const COLUMNS = [
  {
    title: "Name",
    dataIndex: ["service_name", "service_id"],
    key: "name",
    render: (text, row) => {
      let link = "/service/detail?service_id=" + row.service_id;
      return (
        <Link to={link} style={{ color: "black" }}>
          {" "}
          {row.service_name}{" "}
        </Link>
      );
    },
  },
  {
    title: "Owner",
    dataIndex: "service_owner",
    key: "owner",
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
      const modifyServiceLink = "/service/modify?service_id=" + service_id;
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
          <Link to={modifyServiceLink}>
            <Tag color="orange">Modify </Tag>{" "}
          </Link>
        </span>
      );
    },
  },
];

const { Search } = Input;
function SearchBar({
  filterText,
  onFilterTextChange,
  origDataSource,
  setFilterData,
}) {
  return (
    <Search
      placeholder="查詢服務名稱"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={(e) => {
        filterText = e;
        onFilterTextChange(filterText);
        const filteredData = origDataSource.filter((service) =>
          service.service_name.includes(filterText)
        );
        setFilterData(filteredData);
      }}
    />
  );
}

export default function Service() {
  return <FilterableServiceTable />;
}
