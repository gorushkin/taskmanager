import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncActions, actions } from '../slices';
import cn from 'classnames';

const AddProject = ({ handler, btnState }) => {
  const [value, setValue] = useState('');
  const {
    user: { userId },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
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

const ProjectBtn = ({ name, _id }, activeProjectId, changeActiveProject) => {
  const projectBtnClass = cn('nav-link btn-block mb-2 text-left btn', {
    'btn-primary': activeProjectId === _id,
    'btn-light': activeProjectId !== _id,
  });

  const clickHandler = () => {
    changeActiveProject(_id);
  };

  return (
    <li key={_id} className='nav-item'>
      <button onClick={clickHandler} type='button' className={projectBtnClass}>
        {name}
      </button>
    </li>
  );
};

const Projects = () => {
  const { projects, activeProjectId } = useSelector((state) => state.projects);
  const [btnState, setbtnState] = useState(false);
  const dispatch = useDispatch();

  const changeActiveProject = (id) => {
    dispatch(actions.changeActiveProject(id))
  }

  const addProjectHandler = () => {
    setbtnState(!btnState);
  };

  return (
    <ul className='nav flex-column'>
      {projects.map((item) => ProjectBtn(item, activeProjectId, changeActiveProject))}
      <AddProject handler={addProjectHandler} btnState={btnState} />
    </ul>
  );
};

export default Projects;
