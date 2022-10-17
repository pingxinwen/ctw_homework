import { FC, Fragment, useEffect, useMemo, useRef } from 'react';
import {
  Button,
  Col,
  Form,
  FormListFieldData,
  InputNumber,
  Row,
  Select
} from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { dishes as dishesData } from '../util/dishes.json';
import { DishModel } from '../model/model';

interface DishItem extends FormListFieldData {
  remove: () => void;
}

const DishItem: FC<DishItem> = props => {
  const { name, remove, ...restField } = props;
  const currValue = useRef('');

  const instance = Form.useFormInstance();
  const restaurant: string = instance.getFieldValue('restaurant');
  const dishes: Array<DishModel> = Form.useWatch('dishes', instance) || [];
  const selectedDishes = dishes.filter(i => !!i).map(d => d.dish);

  const options = useMemo(() => {
    return dishesData
      .filter(d => d.restaurant === restaurant)
      .filter(
        d => d.name === currValue.current || !selectedDishes.includes(d.name)
      )
      .map(d => ({ label: d.name, value: d.name }));
  }, [restaurant, selectedDishes]);

  return (
    <div className="dish-item">
      <Row>
        <Col span={10}>
          <Form.Item
            {...restField}
            name={[name, 'dish']}
            label="Please Select a Dish"
            rules={[{ required: true }]}
          >
            <Select<string>
              options={options}
              onChange={i => (currValue.current = i)}
              style={{ width: 200 }}
            />
          </Form.Item>
        </Col>
        <Col span={8} offset={2}>
          <Form.Item
            {...restField}
            name={[name, 'num']}
            label="Please enter no. of servings"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label=" ">
            <Button shape="circle" onClick={remove}>
              <MinusCircleOutlined />
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

const Dishes: FC = () => {
  const instance = Form.useFormInstance();
  const dishes = Form.useWatch('dishes', instance);
  const addDisabled = useMemo<boolean>(() => {
    const restaurant: string = instance.getFieldValue('restaurant');
    const optionsNum = dishesData.filter(
      d => d.restaurant === restaurant
    ).length;
    return !!dishes && dishes.length >= optionsNum;
  }, [dishes]);

  useEffect(() => {
    const dishes = instance.getFieldValue('dishes');
    if (!dishes || dishes.length === 0) {
      instance.setFieldValue('dishes', [{ dish: undefined, num: 1 }]);
    }
  }, []);

  return (
    <div>
      <Form.List
        name="dishes"
        rules={[
          {
            validator: async (_, list) => {
              if (!Array.isArray(list)) {
                return Promise.reject(new Error('Should choose one dish'));
              }
              const total = list.reduce((prev, curr) => {
                return prev + curr?.num ?? 0;
              }, 0);
              const people = instance.getFieldValue('people');
              if (total < people) {
                return Promise.reject(
                  new Error(`Can not choose dishes less than people: ${people}`)
                );
              }
              if (total > 10) {
                return Promise.reject(
                  new Error('Can not choose dishes more than 10')
                );
              }
            }
          }
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <Fragment>
            {fields.map((filed, index) => (
              <DishItem
                {...filed}
                key={filed.key}
                remove={() => remove(index)}
              />
            ))}

            <Form.Item>
              <Button
                onClick={() => add()}
                disabled={addDisabled}
                type="primary"
              >
                Add
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </Fragment>
        )}
      </Form.List>
    </div>
  );
};

export default Dishes;
