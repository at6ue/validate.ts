type NumberConstraints = {
  min?: number;
  max?: number;
};

type ConstraintCondition<T> = {
  and?: T[];
  or?: T[];
};

export const validate = (value: string) => {
  return {
    isInteger: (
      constraints: NumberConstraints &
        ConstraintCondition<NumberConstraints> = {}
    ) => isInteger(value, constraints),
  };
};

const INTEGER = /^[+\-]?\d+$/;
const POSITIVE = /^[1-9]\d*$/;
const NEGATIVE = /^\-[1-9]\d*$/;
const isInteger: (
  value: string,
  constraints: NumberConstraints & ConstraintCondition<NumberConstraints>
) => boolean = (value, constraints) => {
  if (!value.match(INTEGER)) {
    return false;
  }

  const num = Number(value);
  return !(
    isNaN(num) ||
    (typeof constraints.min !== "undefined" && num < constraints.min) ||
    (typeof constraints.max !== "undefined" && constraints.max < num) ||
    (typeof constraints.or !== "undefined" &&
      !constraints.or.some((a) => isInteger(value, a))) ||
    (typeof constraints.and !== "undefined" &&
      !constraints.and.every((a) => isInteger(value, a)))
  );
};
