import styled from 'styled-components';

import { useState } from 'react';
import Link from 'next/link';
// import { useRouter } from "next/router";

import { connectToDatabase } from '../lib/mongodb';
import { useAppContext } from '../context/globalState';

import PrimaryButton from "../components/PrimaryButton";
import NewTaskForm from '../components/NewTaskForm';
import TaskCard from '../components/TaskCard';
import TaskInformation from '../components/TaskInformation';

const tasks = ({ tasks }) => {
  const { selectedProjectId } = useAppContext();
  console.log(selectedProjectId)
    const defaultFormState = {
        taskName: '',
        taskDescription: '',
        taskAuthorName: '',
        taskType: 'Select Task Type',
        taskCategory: 'Select Category',
        taskPriority: '',
    }
    
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [taskFormState, setTaskFormState] = useState({...defaultFormState});
    const [taskArr, setTaskArr] = useState(tasks);
    const [showTaskInformation, setShowTaskInformation] = useState(false);

    // Function that hits the endpoint for creating tasks
    const addTask = async () => {
      setShowTaskForm(false);
      const res = await fetch('/api/createTask', {
        method: "POST",
        body: JSON.stringify({
            taskName: taskFormState.taskName,
            taskDescription: taskFormState.taskDescription,
            authorName: 'Nicholas Peters',
            createdDate: new Date(),
            taskType: taskFormState.taskType,
            taskCategory: taskFormState.taskCategory,
            taskStatus: 'Open',
            taskPriority: taskFormState.taskPriority,
            projectId: selectedProjectId,
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
        taskStatus: 'Open',
        taskPriority: taskFormState.taskPriority,
        projectId: selectedProjectId,
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
      console.log(e.target.value);
        setTaskFormState({
            ...taskFormState,
            [type]: e.target.value}
        );
    }

    const deleteTask = async (e) => {
      const selectedTaskId = e.target.dataset.key;
      await fetch('api/deleteTask', {
        method: "POST",
        body: JSON.stringify({
          taskId: selectedTaskId,
        }),
      })
      .then(res => {
        if(res.status === 200) {
          const filteredArr = taskArr.filter(task => task._id != selectedTaskId)
          setTaskArr(filteredArr);
        }
        else {
          alert('Something went wrong! Please try again.')
        }
      });
  }

    return ( 
        <PageContainer>
          {showTaskInformation ? <TaskInformation setShowTaskInformation={setShowTaskInformation}/> : null}
            <Link href='projects'><StyledLink>&#60; Projects</StyledLink></Link>
            <PrimaryButton buttonColor={showTaskForm?'#de493e':'#5E3CF5'} clickFunc={handleFormVisible}>{showTaskForm ? "Cancel" : "Add Task +"}</PrimaryButton>
            <NewTaskForm formOpen={showTaskForm} createTask={addTask} handleFormState={handleFormState} taskFormState={taskFormState} closeForm={closeForm} />
            <TaskList>
                {/* {taskArr.map(task => {
                    return <li key={Math.random()}>{task.task_name}</li>
                })} */}
                {taskArr.map(task => {
                    return <TaskCard key={task._id} {...task} deleteTask={deleteTask} setShowTaskInformation={setShowTaskInformation}/>
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
  const projectId = context.query.projId;
  const { db } = await connectToDatabase();
  const data = await db.collection('tasks').find({projectId: projectId}).toArray();
  const tasks = JSON.parse(JSON.stringify(data));
   return {
       props: { tasks }
   }
}