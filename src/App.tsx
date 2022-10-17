import { useState } from 'react';
import { Button, Form, Modal, Steps } from 'antd';
import { FormModel } from './model/model';
import Dishes from './component/dishes';
import Meal from './component/meal';
import Restaurant from './component/restaurant';
import Review from './component/review';

const Components = [Meal, Restaurant, Dishes, Review];

const steps = [
  {
    title: 'Step 1'
  },
  {
    title: 'Step 2'
  },
  {
    title: 'Step 3'
  },
  {
    title: 'Review'
  }
];

const renderComponent = (index: number) => {
  const Component = Components[index];
  return Component ? <Component /> : null;
};

function App() {
  const [step, setStep] = useState(0);
  const [form] = Form.useForm<FormModel>();
  const items = steps.map(s => ({ key: s.title, title: s.title }));

  const nextStep = () => {
    form
      .validateFields()
      .then(() => {
        setStep(s => s + 1);
      })
      .catch(e => {
        alert('error');
        console.log(e);
      });
  };

  const prevStep = () => {
    setStep(s => s - 1);
  };

  const onFinish = (value: FormModel) => {
    console.log(value);
    Modal.success({
      content: 'Submit successfully.',
      centered: true,
      okText: 'Create again',
      afterClose: () => {
        setStep(0);
        form.resetFields();
      }
    });
  };

  return (
    <div className="wrapper">
      <Steps current={step} items={items} />

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="main">{renderComponent(step)}</div>
        <div className="btn">
          {step > 0 && <Button onClick={prevStep}>Prev</Button>}
          {step < items.length - 1 && (
            <Button type="primary" onClick={nextStep}>
              Next
            </Button>
          )}
          {step === items.length - 1 && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default App;
