import styled from 'styled-components'

const PrimaryButton = ({buttonMargin='auto', href = null, children}) => {
    return ( 
        <StyledButton buttonMargin={buttonMargin}>{children}</StyledButton >
     );
}
 
export default PrimaryButton;

const StyledButton = styled.button`
    background-color: #5E3CF5;
    color: white;
    height: 3.5rem;
    width: 358px;
    margin: ${props => props.buttonMargin};
    border-radius: 500px;
    display: block;
`;