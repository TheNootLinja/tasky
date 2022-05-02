import styled from "styled-components";

import PrimaryButton from "./PrimaryButton";

const TaskInformation = ({setShowTaskInformation}) => {
    return ( 
        <TaskInformationContainer>
            <p>Task Information</p>
            <PrimaryButton clickFunc={() => setShowTaskInformation(false)}>Close</PrimaryButton>
        </TaskInformationContainer>
     );
}
 
export default TaskInformation;

const TaskInformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 50;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    width: 100vw;
    height: 100vh;
`;