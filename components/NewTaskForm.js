import styled from 'styled-components';

import PrimaryButton from './PrimaryButton';

const NewTaskForm = ({ closeForm, taskFormState, handleFormState, createTask}) => {
  const optionLists = [
    {
      name: "bug-list",
      options: [1,2,3],
    },
    {
      name: "feature-list",
      options: [4,5,6],
    },
  ];

  const updateType = (e) => {

  }

    return ( 
        <NewTaskFormContainer>
          <Form>
            <FieldContainer>
              <TextInput onChange={(e) => handleFormState(e, 'taskName')} defaultValue={taskFormState.taskName} placeholder="Task Name" id="task-name"/>
            </FieldContainer>
            <FieldContainer>
              <StyledTextArea onChange={(e) => handleFormState(e, 'taskDescription')} placeholder="Task Description" defaultValue={taskFormState.taskDescription} id="task-description"/>
            </FieldContainer>
            <FieldContainer>
              <StyledSelect onChange={(e) => handleFormState(e, 'taskType')} name="" id="">
                <option value="">Select Category</option>
                <option value="Bug">Bug</option>
                <option value="Feature Request">Feature Request</option>
              </StyledSelect>
            </FieldContainer>
            <FieldContainer>
              <StyledSelect onChange={(e) => handleFormState(e, 'taskCategory')} name="" id="">
                <option value="">Select Bug Category</option>
                <option value="UI">UI</option>
                <option value="Functionality">Functionality</option>
                <option value="Accessibility">Accessibility</option>
              </StyledSelect>
            </FieldContainer>
            <ButtonContainer>
              <PrimaryButton clickFunc={createTask}>Create</PrimaryButton>
              <PrimaryButton clickFunc={closeForm}>Cancel</PrimaryButton>
            </ButtonContainer>
          </Form>
        </NewTaskFormContainer>
     );
}
 
export default NewTaskForm;

const NewTaskFormContainer = styled.div`
  width: 300px;
  height: fit-content;
  margin: 10px auto;
`;

const Form = styled.fieldset`
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

const FieldContainer = styled.div`
  width: 300px;
  height: fit-content;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledLabel = styled.label`
  width: 100%;
  margin: auto;
`;

const TextInput = styled.input`
  /* border: 1px solid rgba(225,225,225,1); */
  /* background-color: rgba(52,57,80,1); */
  background-color: #525a7c;
  box-shadow: 0 4px 10px rgba(0,0,0,.15);
  -webkit-appearance: none;
  width: 100%;
  height: 40px;
  margin: 0 auto;
  padding-left: 10px;
  border-radius: 5px;
  caret-color: #fff;
  color: #ffffff;
  ::placeholder {
    color: #b3b3b3;
  }
`;

const StyledTextArea = styled.textarea`
  /* border: 1px solid rgba(225,225,225,1); */
  -webkit-appearance: none;
  background-color: #525a7c;
  box-shadow: 0 4px 10px rgba(0,0,0,.15);
  padding: 5px 0 0 10px;
  height: 200px;
  width: 100%;
  border-radius: 5px;
  vertical-align: top;
  caret-color: #fff;
  color: #ffffff;
`;

const StyledRadio = styled.input`
margin: 10px 10px 10px 33px;
`;

const StyledSelect = styled.select`
  -webkit-appearance: none;
  box-shadow: 0 4px 10px rgba(0,0,0,.08);
  -webkit-box-shadow: 0 4px 10px rgba(0,0,0,.08);
  width: 100%;
  height: 40px;
  background-color: #525a7c;
  padding-left: 10px;
  border-radius: 5px;
  color: #fff;
  &:first-child {
    color: #b3b3b3;
  }
`;
