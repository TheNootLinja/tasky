import styled from 'styled-components'

const TextInput = ({ clickFunc, defVal, placHol, type }) => {
    return ( 
        <FieldContainer>
            <StyledTextInput type="text" onChange={(e) => clickFunc(e, type)} value={defVal} placeholder={placHol}/>
        </FieldContainer>
     );
}
 
export default TextInput;

const FieldContainer = styled.div`
  width: 300px;
  height: fit-content;
`;

const StyledTextInput = styled.input`
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