export default function userReducer(oldState = '', action) {
  switch (action.type) {
    case 'ADDED': {
      return action.user;
    }
    case 'GUEST': {
      return action.user
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
