import React from 'react';

const IndexPage = () => (
  <div className='jumbotron jumbotron-fluid'>
    <div className='container'>
      <h1 className='display-2'>Task Manager</h1>
      <h2 className='display-5'>Cервис для ведения списка задач</h2>
      <p className='lead pb-5'></p>
      <ul class='list-group d-flex col list-group-flush'>
        <li class='list-group-item d-flex justify-content-between align-items-center'>
          Добавить роутинг
          <span class='badge badge-secondary'>is done</span>
        </li>
        <li class='list-group-item d-flex justify-content-between align-items-center'>
          С делать авторизацию пользователей
          <span class='badge badge-danger'>todo</span>
        </li>
        <li class='list-group-item d-flex justify-content-between align-items-center'>
          Добавить подзадачи
          <span class='badge badge-danger'>todo</span>
        </li>
        <li class='list-group-item d-flex justify-content-between align-items-center'>
          Добавить метки
          <span class='badge badge-danger'>todo</span>
        </li>
      </ul>
    </div>
  </div>
);

export default IndexPage;
