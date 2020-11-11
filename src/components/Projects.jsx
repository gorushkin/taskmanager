import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncActions } from '../slices';
import cn from 'classnames';

const AddProject = ({ handler, btnState }) => {
  const [value, setValue] = useState('');
  const {
    user: { userId },
  } = useSelector((state) => state.user);
  console.log('userId: ', userId);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(value);
    setValue('');
    handler();
    dispatch(asyncActions.addProject({ name: value, userId }));
  };

  if (btnState) {
    return (
      <form onSubmit={submitHandler}>
        <div className='input-group'>
          <input
            onChange={changeHandler}
            type='text'
            className='form-control'
            placeholder='project name'
            aria-describedby='basic-addon1'
            value={value}
          />
        </div>
      </form>
    );
  }
  return (
    <li className='nav-item'>
      <button
        onClick={handler}
        type='button'
        className='text-center nav-link btn-block mb-2 text-left btn btn-light'
      >
        add project
      </button>
    </li>
  );
};

const ProjectBtn = ({ name, _id }, currentProjectId) => {
  const projectBtnClass = cn('nav-link btn-block mb-2 text-left btn', {
    'btn-primary': currentProjectId === _id,
    'btn-light': currentProjectId !== _id,
  });

  return (
    <li key={_id} className='nav-item'>
      <button type='button' className={projectBtnClass}>
        {name}
      </button>
    </li>
  );
};

const Projects = () => {
  const { projects, currentProjectId } = useSelector((state) => state.projects);

  const [isForm, setIsForm] = useState(false);

  const addProjectHandler = () => {
    setIsForm(!isForm);
  };

  return (
    <ul className='nav flex-column'>
      {projects.map((item) => ProjectBtn(item, currentProjectId))}
      <AddProject handler={addProjectHandler} btnState={isForm} />
    </ul>
  );
};

export default Projects;
