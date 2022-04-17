import styled from 'styled-components'

import PrimaryButton from './PrimaryButton'
import TextInput from './TextInput.js'
import TextArea from './TextArea'

const NewTaskForm = ({ taskFormState, handleFormState, createTask, formOpen}) => {
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

  const handleButton = () => {
    console.log('Clicked')
  }

    return ( 
        <NewTaskFormContainer formOpen={formOpen}>
          <Form>
            <TextInput clickFunc={handleFormState} defVal={taskFormState.taskName} type="taskName" placHol={"Task Name"}/>
            <TextArea clickFunc={handleFormState} defVal={taskFormState.taskDescription} type="taskDescription" placHol={"Task Description"} id="tasl-description"/>
            <FieldContainer>
              <StyledSelect onChange={(e) => handleFormState(e, 'taskType')} name="" id="">
                <option value="" defaultValue hidden>Select Category</option>
                <option value="Bug">Bug</option>
                <option value="Feature Request">Feature Request</option>
              </StyledSelect>
            </FieldContainer>
            <FieldContainer>
              <StyledSelect onChange={(e) => handleFormState(e, 'taskCategory')} name="" id="">
                <option value="" defaultValue hidden>Select Bug Category</option>
                <option value="UI">UI</option>
                <option value="Functionality">Functionality</option>
                <option value="Accessibility">Accessibility</option>
              </StyledSelect>
            </FieldContainer>
          </Form>
            <ButtonContainer>
              <PrimaryButton clickFunc={createTask} buttonColor="#35d44a">Create</PrimaryButton>
            </ButtonContainer>
        </NewTaskFormContainer>
     );
}
 
export default NewTaskForm;

const NewTaskFormContainer = styled.div`
  width: 100%;
  max-width: 450px;
  height: ${props => props.formOpen ? "480px" : "0"};
  overflow: hidden;
  margin: 10px auto;
  transition: height .5s;
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
  margin-top: 30px;
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
`;
