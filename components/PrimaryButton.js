import styled from 'styled-components'

const PrimaryButton = ({buttonMargin="auto", href = null, children, clickFunc, formOpen, buttonColor="#5E3CF5"}) => {
    return ( 
        <StyledButton buttonColor={buttonColor} onClick={clickFunc} buttonMargin={buttonMargin}>{children}</StyledButton >
     );
}
 
export default PrimaryButton;

const StyledButton = styled.button`
    /* background-color: #5E3CF5; */
    border: none;
    background-color: ${props => props.buttonColor};
    color: white;
    height: 3.5rem;
    width: 100%;
    max-width: 358px;
    margin: ${props => props.buttonMargin};
    border-radius: 500px;
    display: block;
    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
    transition: background-color .5s;
    @media(hover: hover) {
    :hover {
        background-color: #4323cf;
        }
    }
    :active {
        background-color: #4323cf;
        border: 2px solid #271287;
    }
`;