import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Icon from "@ant-design/icons";

import { Layout, Menu, Switch } from "antd";
import "antd/dist/antd.min.css";
import Service from "./pages/Service";
import Index from "./pages/Index";
import AddServer from "./form/AddServerForm";
import AddService from "./form/AddServiceForm";
import ViewServiceDetail from "./pages/ServiceDetail";
import ModifyService from "./form/ModifyServiceForm";
import ModifyServer from "./form/ModifyServerForm";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const menuItems = [
  {
    label: <Link to="/">Main Page</Link>,
    key: "m1",
  },
  {
    label: <Link to="/service">Service</Link>,
    key: "m2",
  },
  // {
  //   label: <Link to="/server">Server</Link>,
  //   key: "m3",
  // },
];

class App extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu
              theme="dark"
              defaultSelectedKeys={["m1"]}
              mode="inline"
              items={menuItems}
            ></Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0, paddingLeft: 16 }}>
              RD3 Server List
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280,
              }}
            >
              <Routes>
                <Route exact path="/" element={<Index />} />
                <Route exact path="/service" element={<Service />} />
                <Route path="/service/server/add" element={<AddServer />} />
                <Route path="/service/add" element={<AddService />} />
                <Route path="/service/detail" element={<ViewServiceDetail />} />
                <Route path="/service/modify" element={<ModifyService />} />
                <Route
                  path="/service/server/modify"
                  element={<ModifyServer />}
                />
              </Routes>
            </Content>
            <Footer style={{ textAlign: "center" }}>RD3 Design ©2022</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
export default App;
