import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModal } from "./util";
import { UserSelect } from "components/user-select";
import { useAddProject, useEditProject } from "utils/project";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import styled from "@emotion/styled";

/**
 * 创建项目模态窗
 * @param props
 */

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const title = editingProject ? "编辑项目" : "创建项目";
  // 编辑/添加
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const [form] = useForm();

  // editingProject 改变时，表单重置
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  // 提交
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      // 重置表单
      form.resetFields();
      close();
    });
  };

  return (
    <Drawer
      forceRender={true}
      visible={projectModalOpen}
      width={"100%"}
      onClose={close}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>
              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名称" }]}
              >
                <Input placeholder={"请输入部门名称"} />
              </Form.Item>
              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
