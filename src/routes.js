// @ts-check

const host = '';
const prefix = 'api';

export default {
  users: () => [host, prefix, 'users'].join('/'),
  tasks: () => [host, prefix, 'tasks'].join('/'),
  task: (id) => [host, prefix, 'task', id].join('/'),
};
