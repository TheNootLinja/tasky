import styled from 'styled-components';

import { useState } from 'react';

import PrimaryButton from "../components/PrimaryButton";
import ProjectCard from '../components/ProjectCard';
import NewTaskForm from '../components/NewTaskForm';

import { connectToDatabase } from '../lib/mongodb';

const tasks = ({ tasks }) => {

    const defaultFormState = {
        taskName: '',
        taskDescription: '',
        taskAuthorName: '',
        taskType: '',
        taskCategory: '',
    }
    
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [taskFormState, setTaskFormState] = useState(defaultFormState);

    const taskList = [];
    // Function that hits the endpoint for creating tasks
    const addTask = () => {
      setShowTaskForm(false);
      console.log(taskFormState)
      fetch('http://localhost:3000/api/createTask', {
        method: "POST",
        body: JSON.stringify({
          task_name: taskFormState.taskName,
          task_description: taskFormState.taskDescription,
          author_name: 'Nicholas Peters',
          created_date: new Date(),
          task_type: taskFormState.taskType,
          task_category: taskFormState.taskCategory,
        }),
      });
    };

    const openTaskForm = () => {
      setShowTaskForm(true)
    }

    const handleFormState = (e, type) => {
        setTaskFormState({
            ...taskFormState,
            [type]: e.target.value}
        );
    }

    const closeForm = () => {
        setShowTaskForm(false);
    }


    return ( 
        <PageContainer>
            <h1>tracky</h1>
            { !showTaskForm ? <PrimaryButton clickFunc={openTaskForm}>New Task</PrimaryButton> : null }
            { showTaskForm ? <NewTaskForm createTask={addTask} handleFormState={handleFormState} taskFormState={taskFormState} closeForm={closeForm} /> : null }
            <TaskList>
                {tasks.map(task => {
                    return <li key={task._id}>{task.task_name}</li>
                })}
            </TaskList>
        </PageContainer>
     );
}

export default tasks;

const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
`;

const TaskList = styled.ul`
    margin-top: 20px;
`;

const ProjectCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
`;

export async function getServerSideProps(context){
  const { db } = await connectToDatabase();
  const data = await db.collection('tasks').find({}).toArray();
  const tasks = JSON.parse(JSON.stringify(data));
   return {
       props: { tasks }
   }
}