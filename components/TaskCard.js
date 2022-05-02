import styled from 'styled-components'
import tasks from '../pages/tasks';

const TaskCard = ({taskName, taskStatus, _id, deleteTask, taskPriority, setShowTaskInformation}) => {

    const handlePriorityColor = priority => {
        switch (priority) {
            case "1":
                return "red";
            case "2":
                return "orange";
            case "3":
                return "yellow";
            case "4":
                return "green";
            default:
                return "#fff"
        }
    }

    return ( 
        <TaskCardContainer onClick={() => setShowTaskInformation(true)}>
            <PriorityColor taskPriority={() => handlePriorityColor(taskPriority)}/>
            <InfoContainer>
                <TaskName>{taskName}</TaskName>
                <p>{taskStatus}</p>
                <p>{taskPriority}</p>
            </InfoContainer>
            <DeleteIcon data-key={_id} onClick={(e) => deleteTask(e)}>X</DeleteIcon>
        </TaskCardContainer>
     );
}
 
export default TaskCard;

const TaskCardContainer = styled.div`
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    margin: auto;
    float: left;
    width: 90%;
    height: 150px;
    max-width: 450px;
    background: #fff;  
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    &:before {
        border-radius: inherit;
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        box-shadow: 0 4px 20px rgba(0,0,0,.30);
    };
`;

const PriorityColor = styled.div`
    border-radius: 10px 10px 0 0;
    position: absolute;
    left: 0;
    top: 0;
    background: ${props => props.taskPriority};
    width: 100%;
    height: 20px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const TaskName = styled.p`
    font-size: 1.5rem;
`;

const DeleteIcon = styled.button`
    color: red;
    border: none;
    background: none;
`;