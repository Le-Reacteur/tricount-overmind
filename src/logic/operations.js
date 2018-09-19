export const doPreventDefault = (_, event) => {
  event.preventDefault();
};

export const validatedIsValid = (_, value) => {
  return !value.error;
};
