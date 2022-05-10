import React, { useState } from "react";
import { Modal, Button } from "antd";

function DisplayModal(title, content) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function show() {
    setIsModalVisible(true);
  }

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={true}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {content}
      </Modal>
    </>
  );
}

export default DisplayModal;
