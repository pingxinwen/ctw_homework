import { FC } from 'react';
import { Form } from 'antd';
import { FormModel } from '../model/model';

const Review: FC = () => {
  const instance = Form.useFormInstance();
  const { meal, people, restaurant, dishes }: FormModel =
    instance.getFieldsValue(true);

  return (
    <div className="review">
      <div className="label">Meal</div>
      <div className="value">{meal[0].toUpperCase() + meal.slice(1)}</div>

      <div className="label">No. of People</div>
      <div className="value">{people}</div>

      <div className="label">Restaurant</div>
      <div className="value">{restaurant}</div>

      <div className="label">Dishes</div>
      <div className="value">
        {dishes.map(({ dish, num }, index) => (
          <div className="item" key={index}>
            {dish} - {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
