import styled from 'styled-components';

import { useState } from 'react';

import PrimaryButton from "../components/PrimaryButton";
import ProjectCard from '../components/ProjectCard';
import NewTaskForm from '../components/NewTaskForm';

import { connectToDatabase } from '../lib/mongodb';

const tasks = ({ tasks }) => {
    
    const [showTaskForm, setShowTaskForm] = useState(false);

    const taskList = [];
    // Function that hits the endpoint for creating tasks
    const addTask = () => {
      setShowTaskForm(!showTaskForm);
      // fetch('http://localhost:3000/api/createTask', {
      //   method: "POST",
      //   body: JSON.stringify({
      //     task_name: 'testing task name',
      //     author_name: 'Nicholas Peters',
      //   }),
      // });
    };

    const closeForm = () => {
        setShowTaskForm(false);
    }


    return ( 
        <PageContainer>
            <h1>Tasks</h1>
            { !showTaskForm ? <PrimaryButton clickFunc={addTask}>New Task</PrimaryButton> : null }
            { showTaskForm ? <NewTaskForm closeForm={closeForm} /> : null }
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
    width: fit-content;
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