export const user = (state, action) => {
  switch (action.type) {
    case 'USER__SIGNIN': {
      const { user } = action.payload;
      return user;
    }
    case 'USER__INIT': {
      const { user } = action.payload;
      return user;
    }
    default: {
      return state;
    }
  }
};

export default user;
