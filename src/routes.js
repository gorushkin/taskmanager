const host = '';
const prefix = 'api';

const routers = {
  users: () => [host, prefix, 'users/login'].join('/'),
  tasks: () => [host, prefix, 'tasks'].join('/'),
  task: (id) => [host, prefix, 'task', id].join('/'),
};

export default routers;
