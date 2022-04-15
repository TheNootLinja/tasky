import styled from 'styled-components';

import { useState } from 'react';
import Link from 'next/link';

import PrimaryButton from "../components/PrimaryButton";
import NewTaskForm from '../components/NewTaskForm';
import TaskCard from '../components/TaskCard';

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
    const [taskArr, setTaskArr] = useState(tasks);

    // Function that hits the endpoint for creating tasks
    const addTask = async () => {
      setShowTaskForm(false);
      console.log(taskFormState)
      const res = await fetch('http://localhost:3000/api/createTask', {
        method: "POST",
        body: JSON.stringify({
            taskName: taskFormState.taskName,
            taskDescription: taskFormState.taskDescription,
            authorName: 'Nicholas Peters',
            createdDate: new Date(),
            taskType: taskFormState.taskType,
            taskCategory: taskFormState.taskCategory,
            taskStatus: 'Open',
        }),
      });
      const data = await res.json()
      const newTask = {
        taskName: taskFormState.taskName,
        taskDescription: taskFormState.taskDescription,
        authorName: 'Nicholas Peters',
        createdDate: new Date(),
        taskType: taskFormState.taskType,
        taskCategory: taskFormState.taskCategory,
        _id: data.taskID
      }
      setTaskArr(taskArr => [...taskArr, newTask])
      setTaskFormState(defaultFormState)
    };

    const handleFormVisible = () => {
      setShowTaskForm(!showTaskForm);
    }

    const closeForm = () => {
        setShowTaskForm(false);
        setTaskFormState(defaultFormState);
    }

    const handleFormState = (e, type) => {
        setTaskFormState({
            ...taskFormState,
            [type]: e.target.value}
        );
    }

    return ( 
        <PageContainer>
            <StyledLink href='/projects'>&#60; Projects</StyledLink>
            <PrimaryButton buttonColor={showTaskForm?'#de493e':'#5E3CF5'} clickFunc={handleFormVisible}>{showTaskForm ? "Cancel" : "Add Task +"}</PrimaryButton>
            <NewTaskForm formOpen={showTaskForm} createTask={addTask} handleFormState={handleFormState} taskFormState={taskFormState} closeForm={closeForm} />
            <TaskList>
                {/* {taskArr.map(task => {
                    return <li key={Math.random()}>{task.task_name}</li>
                })} */}
                {taskArr.map(task => {
                    return <TaskCard key={task._id} taskName={task.taskName}/>
                })}
            </TaskList>
        </PageContainer>
     );
}

export default tasks;

const PageContainer = styled.div`
    width: 100%;
`;

const StyledLink = styled.a`
  display: inline-block;
  padding: 0.5rem;
  margin: 0.5rem 1rem 0.5rem 2rem;
  color: #5E3CF5;
  font-weight: 600;
`;

const TaskList = styled.ul`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
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