import styled from 'styled-components'

import PrimaryButton from "../components/PrimaryButton";
import ProjectCard from '../components/ProjectCard';

const projects = () => {

    const projectsList = [
        {
            name: 'project #1',
            number: 'abd123',
            owner: 'Nicholas Peters',
        },
        {
            name: 'project #2',
            number: 'def456',
            owner: 'Nicholas Peters',
        },
        {
            name: 'project #3',
            number: 'ghi789',
            owner: 'Nicholas Peters',
        },
    ]

    return ( 
        <PageContainer>
            <h1>Projects</h1>
            <PrimaryButton buttonMargin='0 auto 20px auto'>Add Project +</PrimaryButton>
            <ProjectCardContainer>
                {projectsList.map((project) => {
                    return <ProjectCard key={project.number} {...project}/>
                })}
            </ProjectCardContainer>
        </PageContainer>
     );
}

export default projects;

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