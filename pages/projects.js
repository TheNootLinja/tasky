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
    }

    const [showForm, setShowForm] = useState(false);
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


    const projectsList = projects;

    return ( 
        <PageContainer>
            <h1>Projects</h1>
            {showForm ? <NewProjectForm closeForm={handleFormVisible}/> : <PrimaryButton clickFunc={handleFormVisible} buttonMargin='0 auto 20px auto'>Add Project +</PrimaryButton>}
            <ProjectCardContainer>
                {projectsList.map((project) => {
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