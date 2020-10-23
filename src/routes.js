// @ts-check

const host = '';
const prefix = 'api';

export default {
  tasks: () => [host, prefix, 'tasks'].join('/'),
  addtask: () => [host, prefix, 'addtask'].join('/'),
  removeTask: (id) => [host, prefix, 'removeTask', id].join('/'),
};
