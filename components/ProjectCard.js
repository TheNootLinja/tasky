import styled from 'styled-components'

const ProjectCard = (project) => {
    return ( 
        <ProjectCardContainer>
            <p>{project.projectName}</p>
            <p>{project.authorName}</p>
        </ProjectCardContainer>
     );
}
 
export default ProjectCard;

const ProjectCardContainer = styled.div`
    height: 50px;
    width: 358px;
    margin: auto;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,.30)
`;