import styled from 'styled-components'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { connectToDatabase } from '../lib/mongodb';

import PrimaryButton from "../components/PrimaryButton";
import ProjectCard from '../components/ProjectCard';
import NewProjectForm from '../components/NewProjectForm';

const projects = ({projects}) => {
    const router = useRouter()
    const session = useSession({
        required: true,
        onUnauthenticated() {
            console.log("you're a stinky boy")
            router.push('/')
        }
    })
    const defaultFormState = {
        projectName: '',
        projectDescription: '',
        authorId: '',
        authorEmail: '',
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
        const res = await fetch('/api/createProject', {
          method: "POST",
          body: JSON.stringify({
              projectName: projectFormState.projectName,
              projectDescription: projectFormState.projectDescription,
              authorId: session.data?.userid,
              authorEmail: session.data?.user.email,
              createdDate: new Date()
          }),
        });
        const data = await res.json()
        const newProject = {
          projectName: projectFormState.projectName,
          projectDescription: projectFormState.projectDescription,
          authorId: session.data?.user.id,
          authorEmail: session.data?.user.email,
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