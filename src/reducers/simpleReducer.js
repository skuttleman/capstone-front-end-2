export default (TYPE, property, initial) => {
  return (state = initial, action) => {
    return (action.type === TYPE) ? action[property] : state;
  };
};
