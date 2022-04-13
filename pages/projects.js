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
        setProjectFormState(defaultFormState)
      };

    return ( 
        <PageContainer>
            <h1>Projects</h1>
            
            <PrimaryButton buttonColor={showForm?'#de493e':'#5E3CF5'} formOpen={showForm} clickFunc={handleFormVisible} buttonMargin='0 auto'>{showForm ? "Cancel" : "Add Project +"}</PrimaryButton>
            <NewProjectForm formOpen={showForm} projectFormState={projectFormState} addProject={addProject} closeForm={handleFormVisible} handleFormState={handleFormState}/>
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
    height: fit-content;
`;

const ProjectCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    height: fit-content;
    padding-bottom: 20px;
`;