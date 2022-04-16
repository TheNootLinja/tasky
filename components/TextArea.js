import styled from 'styled-components'

const TextArea = ({ clickFunc, defVal, placHol, type }) => {
    return (
        <FieldContainer>
            <StyledTextArea onChange={(e) => clickFunc(e, type)} placeholder={placHol} value={defVal} name="" id="" cols="30" rows="10" />
        </FieldContainer>
     );
}
 
export default TextArea;

const FieldContainer = styled.div`
  width: 300px;
  height: fit-content;
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