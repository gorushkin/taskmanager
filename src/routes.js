const host = '';
const prefix = 'api';

const routers = {
  login: () => [host, prefix, 'login'].join('/'),
  register: () => [host, prefix, 'register'].join('/'),
  tasks: () => [host, prefix, 'tasks'].join('/'),
  task: (id) => [host, prefix, 'task', id].join('/'),
};

export default routers;
