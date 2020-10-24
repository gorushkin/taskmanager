// @ts-check

const host = '';
const prefix = 'api';

export default {
  tasks: () => [host, prefix, 'tasks'].join('/'),
  task: (id) => [host, prefix, 'task', id].join('/'),
};
