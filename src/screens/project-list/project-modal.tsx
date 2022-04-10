import React from "react";
import { Button, Drawer } from "antd";

/**
 * 创建项目模态窗
 * @param props
 */

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      visible={props.projectModalOpen}
      width={"100%"}
      onClose={props.onClose}
    >
      <h2>Project modal</h2>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};
