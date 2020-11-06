export const alert = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALERT': {
      const { name, type } = action.payload;
      return { name, type };
    }
    case 'HIDE_ALERT': {
      return { name: null, type: null };
    }
    default: {
      return state;
    }
  }
};

export default alert;
