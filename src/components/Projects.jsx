import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

const ProjectBtn = ({name, _id}, currentProjectId) => {
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

  const addProjectHandler = () => {
    console.log('add');

  }

  return (
    <ul className='nav flex-column'>
      {projects.map((item) => ProjectBtn(item, currentProjectId))}
      <li className='nav-item'>
        <button onClick={addProjectHandler} type='button' className='text-center nav-link btn-block mb-2 text-left btn btn-light'>
          add project
        </button>
      </li>
    </ul>
  );
};

export default Projects;
