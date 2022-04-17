import styled from 'styled-components'

import TextInput from './TextInput.js'
import TextArea from './TextArea'
import PrimaryButton from './PrimaryButton.js'

const NewProjectForm = ({closeForm, addProject, handleFormState, projectFormState, formOpen}) => {
  return ( 
      <NewProjectFormContainer formOpen={formOpen}>
          <StyledForm>
          <TextInput clickFunc={handleFormState} defVal={projectFormState.projectName} type='projectName' placHol='Project Name'/>
          <TextArea clickFunc={handleFormState} defVal={projectFormState.projectDescription} type='projectDescription' placHol='Project Description'/>
        </StyledForm>
          <ButtonContainer>
            <PrimaryButton clickFunc={addProject} buttonColor="#35d44a">Create</PrimaryButton>
            {/* <PrimaryButton clickFunc={closeForm}>Cancel</PrimaryButton> */}
          </ButtonContainer>
      </NewProjectFormContainer>
    );
}
 
export default NewProjectForm;

const NewProjectFormContainer = styled.div`
  width: 100%;
  max-width: 450px;
  height: ${props => props.formOpen ? "390px" : "0"};
  overflow: hidden;
  margin: 10px auto;
  transition: height .5s;
`;

const StyledForm = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
  margin: 0 auto;
  width: 300px;
  :first-child {
    margin-top: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
`;