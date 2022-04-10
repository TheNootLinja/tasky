import styled from 'styled-components'

import TextInput from './TextInput.js'
import TextArea from './TextArea'
import PrimaryButton from './PrimaryButton.js'

const NewProjectForm = ({closeForm, addProject, handleFormState, projectFormState}) => {
  return ( 
      <NewProjectFormContainer>
          <StyledForm>
          <TextInput clickFunc={handleFormState} defVal={projectFormState.projectName} type='projectName' placHol='Project Name'/>
          <TextArea clickFunc={handleFormState} defVal={projectFormState.projectDescription} type='projectDescription' placHol='Project Description'/>
          <ButtonContainer>
            <PrimaryButton clickFunc={addProject}>Create</PrimaryButton>
            <PrimaryButton clickFunc={closeForm}>Cancel</PrimaryButton>
          </ButtonContainer>
        </StyledForm>
      </NewProjectFormContainer>
    );
}
 
export default NewProjectForm;

const NewProjectFormContainer = styled.div`
  width: 300px;
  height: fit-content;
  margin: 10px auto;
`;

const StyledForm = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: 0 auto;
  width: 300px;
  :first-child {
    margin-top: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;