import { Create, useForm } from "@refinedev/antd";
import { Form, Input} from 'antd';

export const CategoryCreate = () => {
  
  const { formProps, saveButtonProps } = useForm({
    warnWhenUnsavedChanges: true,
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps}  layout="vertical">
      <Form.Item label="Icon" name="icon">
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};