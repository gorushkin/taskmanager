export const tasks = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      return [action.payload, ...state];
    }
    case 'FETCH_TASKS': {
      return [...action.payload];
    }
    case 'REMOVE_TASK': {
      return state.filter((item) => item._id !== action.payload);
    }
    case 'MODIFY_TASK': {
      const { _id, text, isDone } = action.payload;
      return state.map((item) => {
        if (item._id !== _id) return item;
        return { ...item, text, isDone };
      });
    }
    default:
      return state;
  }
};

export default tasks;