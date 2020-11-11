const host = '';
const prefix = 'api';

const routers = {
  user: () => [host, prefix, 'user'].join('/'),
  login: () => [host, prefix, 'login'].join('/'),
  logout: () => [host, prefix, 'logout'].join('/'),
  register: () => [host, prefix, 'register'].join('/'),
  tasks: () => [host, prefix, 'tasks'].join('/'),
  task: (id) => [host, prefix, 'task', id].join('/'),
  projects: () => [host, prefix, 'projects'].join('/'),
  project: (id) => [host, prefix, 'projects', id].join('/'),
};

export default routers;
