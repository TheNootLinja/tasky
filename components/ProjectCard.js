import styled from 'styled-components'
import Link from 'next/link';

const ProjectCard = (project) => {
    return ( 
        <ProjectCardContainer>
            
            <InfoContainer>
                <div>
                    <ProjectName>{project.projectName}</ProjectName>
                </div>
            </InfoContainer>
            <ButtonMenu>
                {/* <OpenTaskText  color="red">3 Urgent Priority</OpenTaskText>
                <OpenTaskText  color="orange">10 High Priority</OpenTaskText>
                <OpenTaskText  color="green">25 Low Priority</OpenTaskText> */}
                <StyledLink href='/tasks'>Tasks</StyledLink>
                <StyledDivider/>
                <StyledLink href='/settings'>Project Settings</StyledLink>
            </ButtonMenu>
        </ProjectCardContainer>
     );
}
 
export default ProjectCard;

const ButtonMenu = styled.div`
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

const StyledDivider = styled.div`
    height: 1px;
    width: 95%;
    background: rgba(0,0,0,0.2);
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
    transition: transform .5s;
    transition: box-shadow .5s;
    &:hover{
        /* transform: scaleY(1.2); */
        transform: scale(1.1);
        box-shadow: 0 7px 30px rgba(0,0,0,.2);
        ${ButtonMenu}{
            width: 150px;
            opacity: 100;
        }
    }
`;

const StyledLink = styled.a`
  display: inline-block;
  padding: 0.5rem;
  /* margin: 0.5rem 1rem 0.5rem 2rem; */
  color: #5E3CF5;
  font-weight: 600;
  white-space: nowrap;
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