const host = '';
const prefix = 'api';

const routers = {
  user: () => [host, prefix, 'user'].join('/'),
  login: () => [host, prefix, 'login'].join('/'),
  logout: () => [host, prefix, 'logout'].join('/'),
  register: () => [host, prefix, 'register'].join('/'),
  tasks: () => [host, prefix, 'tasks'].join('/'),
  projects: () => [host, prefix, 'projects'].join('/'),
  task: (id) => [host, prefix, 'task', id].join('/'),
};

export default routers;
