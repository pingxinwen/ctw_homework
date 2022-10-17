import { FC, useEffect, useMemo } from 'react';
import { Form, Select } from 'antd';
import { dishes } from '../util/dishes.json';
import { FormModel } from '../model/model';

const findRestaurantOptions = (meal: string) => {
  const restaurants = dishes.filter(v => v.availableMeals.includes(meal));
  const options = [...new Set(restaurants.map(re => re.restaurant))].map(i => ({
    label: i,
    value: i
  }));
  return options;
};

const Restaurant: FC = () => {
  const instance = Form.useFormInstance<FormModel>();
  const meal: string = instance.getFieldValue('meal') || '';
  const options = useMemo(() => findRestaurantOptions(meal), [meal]);

  useEffect(() => {
    const curr = instance.getFieldValue('restaurant');

    return () => {
      if (curr && curr !== instance.getFieldValue('restaurant')) {
        instance.setFieldValue('dishes', undefined);
      }
    };
  }, []);

  return (
    <Form.Item
      required
      name="restaurant"
      label="Restaurant"
      rules={[{ required: true, message: 'Please Choose Restaurant' }]}
    >
      <Select options={options} style={{ width: 200 }} />
    </Form.Item>
  );
};

export default Restaurant;
