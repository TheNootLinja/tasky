import styled from 'styled-components'
import { useState } from 'react'

import { connectToDatabase } from '../lib/mongodb';

import PrimaryButton from "../components/PrimaryButton";
import ProjectCard from '../components/ProjectCard';
import NewProjectForm from '../components/NewProjectForm';

const projects = ({projects}) => {

    const defaultFormState = {
        projectName: '',
        projectDescription: '',
        authorName: '',
        createdDate: null,
    }

    const [showForm, setShowForm] = useState(false);
    const [projectsArr, setProjectsArr] = useState(projects);
    const [projectFormState, setProjectFormState] = useState(defaultFormState);

    const handleFormState = (e, type) => {
        setProjectFormState({
            ...projectFormState,
            [type]: e.target.value
        })
    }

    const handleFormVisible = () => {
        setShowForm(!showForm);
    }

    const addProject = async () => {
        setShowForm(false);
        const res = await fetch('http://localhost:3000/api/createProject', {
          method: "POST",
          body: JSON.stringify({
              projectName: projectFormState.projectName,
              projectDescription: projectFormState.projectDescription,
              authorName: 'Nicholas Peters',
              createdDate: new Date()
          }),
        });
        const data = await res.json()
        const newProject = {
          projectName: projectFormState.projectName,
          projectDescription: projectFormState.projectDescription,
          authorName: 'Nicholas Peters',
          created_date: new Date(),
          _id: data.projectID,
        }
        setProjectsArr(projectsArr => [...projectsArr, newProject])
      };

    return ( 
        <PageContainer>
            <h1>Projects</h1>
            {showForm ? <NewProjectForm projectFormState={projectFormState} addProject={addProject} closeForm={handleFormVisible} handleFormState={handleFormState}/> : <PrimaryButton clickFunc={handleFormVisible} buttonMargin='0 auto 20px auto'>Add Project +</PrimaryButton>}
            <ProjectCardContainer>
                {projectsArr.map((project) => {
                    return <ProjectCard key={project._id} {...project}/>
                })}
            </ProjectCardContainer>
        </PageContainer>
     );
}

export default projects;

export async function getServerSideProps(context){
    const { db } = await connectToDatabase();
    const data = await db.collection('projects').find({}).toArray();
    const projects = JSON.parse(JSON.stringify(data));
     return {
         props: { projects }
     }
  }

const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
`;

const ProjectCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
`;