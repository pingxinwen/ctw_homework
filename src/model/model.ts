export interface DishModel {
  dish: string;
  num: number;
}

export interface FormModel {
  meal: string;
  people: number;
  restaurant: string;
  dishes: Array<DishModel>;
}
