import React, { useState } from "react";
import { Form, Select, Button } from "antd";

const { Option } = Select;

interface Props {}

const options = [
  {
    label: "Fruits",
    options: ["Apple", "Banana", "Orange"],
  },
  {
    label: "Vegetables",
    options: ["Carrot", "Broccoli", "Spinach"],
  },
];

const FormWithDropdowns: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const [secondDropdownOptions, setSecondDropdownOptions] = useState<string[]>([]);

  const handleFirstDropdownChange = (value: string) => {
    // Find the selected options from the options array
    const selectedOption = options.find((option) => option.label === value);
    if (selectedOption) {
      setSecondDropdownOptions(selectedOption.options);
    }
  };

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="firstDropdown" label="First Dropdown" rules={[{ required: true }]}>
        <Select onChange={handleFirstDropdownChange}>
          {options.map((option) => (
            <Option key={option.label} value={option.label}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="secondDropdown" label="Second Dropdown" rules={[{ required: true }]}>
        <Select>
          {secondDropdownOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormWithDropdowns;
