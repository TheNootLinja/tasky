import styled from 'styled-components'

const ProjectCard = (project) => {
    return ( 
        <ProjectCardContainer>
            <InfoContainer>
                <div>
                    <ProjectName>{project.projectName}</ProjectName>
                </div>
            </InfoContainer>
            <TestOpenButton>
                <OpenTaskText  color="red">3 Urgent Priority</OpenTaskText>
                <OpenTaskText  color="orange">10 High Priority</OpenTaskText>
                <OpenTaskText  color="green">25 Low Priority</OpenTaskText>
            </TestOpenButton>
        </ProjectCardContainer>
     );
}
 
export default ProjectCard;

const TestOpenButton = styled.div`
    background-color: #ccc;
    height: 100%;
    width: 0;
    opacity: 0;
    transition: all .5s;
    border-radius: 0 10px 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;
`;

const ProjectCardContainer = styled.div`
    height: 100px;
    width: 325px;
    margin: auto;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,.30);
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all .5s;
    &:hover{
        transform: scale(1.1);
        box-shadow: 0 7px 30px rgba(0,0,0,.2);
        ${TestOpenButton}{
            width: 150px;
            opacity: 100;
        }
    }
`;

const InfoContainer = styled.div`
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    width:175px;
`;

const ProjectName =  styled.h3`
    font-size: 1.1rem;
`;

const OpenTaskText = styled.p`
    color: ${props => props.color};
    white-space: nowrap;
    overflow: hidden;
    width: 125px;
    text-align: left;
`;