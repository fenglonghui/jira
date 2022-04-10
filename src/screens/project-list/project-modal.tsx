import React from "react";
import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalOpen,
} from "./project-list.slice";

/**
 * 创建项目模态窗
 * @param props
 */

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);

  return (
    <Drawer
      visible={projectModalOpen}
      width={"100%"}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
    >
      <h2>Project modal</h2>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        关闭
      </Button>
    </Drawer>
  );
};
