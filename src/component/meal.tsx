import { FC, Fragment, useEffect } from 'react';
import { Form, Select, InputNumber } from 'antd';

const options = ['breakfast', 'lunch', 'dinner'].map(i => ({
  label: i,
  value: i
}));

const Meal: FC = () => {
  const instance = Form.useFormInstance();

  useEffect(() => {
    const meal:string = instance.getFieldValue('meal');

    return () => {
      if (meal !== instance.getFieldValue('meal')) {
        instance.setFieldValue('restaurant', undefined);
        instance.setFieldValue('dishes', undefined);
      }
    };
  }, []);

  return (
    <Fragment>
      <Form.Item
        label="Meal"
        name="meal"
        rules={[{ required: true, message: 'Please choose meal' }]}
      >
        <Select options={options} style={{ width: 200 }} />
      </Form.Item>
      <Form.Item
        label="No. of People"
        name="people"
        rules={[{ required: true, message: 'Please input number of people' }]}
      >
        <InputNumber min={1} max={10} style={{ width: 200 }} />
      </Form.Item>
    </Fragment>
  );
};

export default Meal;
