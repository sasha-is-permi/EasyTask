import React, {useCallback, useEffect, useState} from 'react';
import TasksTableHead from './TasksTableHead';
import TasksTableContent from './TasksTableContent';
import {connect} from 'react-redux';
import {
    changeTaskList,
    fetchTasks,
    loadSpecificTask,
    setSelectedUserId,
} from '../actions';
import {Task} from '../../../common/types';
import arrayMove from 'array-move';
import {State} from '../../../rootReducer';
import {useParams} from 'react-router-dom';
import {columnsOfTables} from '../../../common/shared_data';
import {selectTask, setShownTaskInfoPlate} from '../../TaskInfoPlate/actions';
import {store} from '../../../App';
import styled from 'styled-components';
import {FilterTemplates, setFilters} from "../../../common/actions";
import { fetchData } from '../../../utils/fetchData'; //**************************** */
import ButtonEasy from '../../../common/components/newComponent/Buttons/Button';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
    tasks: Task[];
    isLoading: boolean;
    currentId: number;
    selectedUserId: number;
    changeTaskList: (tasks: Task[]) => void;
    fetchTasks: (pageNum: number) => void;
    setSelectedUserId: (id: number) => void;
    activeColumns: string[];
    selectTask: (val: Task) => void;
    setShownTaskInfoPlate: (val: boolean) => void;
    loadSpecificTask: (val: number) => void;
    isShownTaskInfoPlate: boolean;
    selectedTask: Task | null;
    updateTask: boolean;
    setUpdateTask: (bool: boolean) => void;
    FilterTemplates: (data: {}) => void,
    current_user: number,
    setFilters: (
        data_from?: string,
        date_to?: string,
        executors?: number[],
        authors?: number[],
        statuses?: number[],
        actual?: boolean
    ) => void
};

const WrapperTasksTable = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* overflow: auto; */

  ${({isLoading}) =>
    isLoading &&
    `
&:before {
      content: '';
      background: #fff;
      z-index: 3;
      width:100%;
      height: 100%;
      position:absolute;
      top:-5px;
      right:0;
}
    &:after {
      content: '';
      border-radius: 50%;
      border: 3px solid #1BAAF0;
      z-index: 3;
      border-bottom-color: #fff;
      border-left-color: #fff;
      animation: spin .5s linear infinite;
      transform: translateX(-50%);
      position:absolute;
      top:250px;
      left:50%;
      height:16px;
      width:16px;
    }
`}
`;

const TasksTable: React.FC<Props> = ({
                                         activeColumns,
                                         selectedTask,
                                         isShownTaskInfoPlate,
                                         loadSpecificTask,
                                         selectTask,
                                         setShownTaskInfoPlate,
                                         tasks,
                                         isLoading,
                                         currentId,
                                         selectedUserId,
                                         changeTaskList,
                                         fetchTasks,
                                         setSelectedUserId,
                                         updateTask,
                                         setUpdateTask,
                                         FilterTemplates,
                                         current_user,
                                         setFilters
                                     }) => {
    const [specTask, setSpecTask] = useState<boolean>(true);
    const sortEndHandler = useCallback(
        ({oldIndex, newIndex}) => {
            let clone = tasks.slice();
            changeTaskList(arrayMove(clone, oldIndex, newIndex));
        },
        [tasks, changeTaskList]
    );
    const {id} = useParams();

    // здесь смотрю, есть ли в строке адреса решетка, то есть хэш. Если да, значит нужно открыть задачу с конкретным id. Если есть - показываю ее. Если нет - делаю на нее запрос, пригоняю, и сразу же, без добавления в tasks, показываю в боковой панели.
    if (!isShownTaskInfoPlate) {
        const hash = window.location.hash;
        if (hash) {
            let task_id, found_task;
            if (hash.substr(0, 9) === '#task_id=')
                task_id = parseInt(hash.substr(9, hash.length - 9));
            if (task_id && !selectedTask && tasks.length) {
                Object.keys(tasks).forEach((item) => {
                    if (tasks[item].id === task_id) found_task = tasks[item];
                });

                if (found_task) {
                    // найдена в уже приехавших тасках
                    setTimeout(() => {
                        if (store.getState().tasksPage.taskAddMode) return;
                        selectTask(found_task);
                        setShownTaskInfoPlate(true);
                    }, 500);
                } else {
                    if (specTask) {
                        setTimeout(() => loadSpecificTask(task_id), 0);
                        setSpecTask(false);
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (id) setSelectedUserId(parseInt(id));
        else setSelectedUserId(currentId);
    }, [currentId, id, setSelectedUserId]);

    useEffect(() => {
        changeTaskList([]);
    }, [id, changeTaskList]);

    useEffect(() => {
        fetchTasks(1);
    }, [fetchTasks, id]);




    //*************************************************** */
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
      };

  
      useEffect(()=>{  
        setTimeout(() =>
        {
        if (tasks.length===0){
        //    alert("111")
        }

        }
        
        , 3000);
        },[])

    useEffect(()=>{  
    setTimeout(() =>setOpen(true), 3000);
    },[])


    const  [tasksNone,settasksNone] = useState<boolean>(false)


    useEffect(()=>{
 
       let dataFetch= false;
        let data1:[]=[];
      
       fetchData.get(`/api/v1/tasks?`) 
        
        .then(function (data) {
          dataFetch=true;
          data1= data
           console.log("data",data)
        })
        .catch(function (error) {
          console.log("error",error)
        })   
      
       // console.log(tasks,"tasks")
      
      
        
        setTimeout(() =>{
       if (dataFetch){  
         if (data1){
           if (Array.isArray(data1)){
             if (data1.length===0){
               // settasksNone
        console.log("data.length",data1.length)
     // setShownTaskInfoPlate(true); 
     settasksNone(true);
             }
           }
         }
      }
      

      
      }
        , 3000);
        },[])

//***************************************************** */




    return (
        <WrapperTasksTable isLoading={isLoading}>
            <>
             {/**************************************************** */}

             {tasksNone ? (
                    <>
                    <div style={{padding: '24px'}} className="main_title">
                        Задачи отсутствуют
                    </div>
                    <div>
      <Dialog
      
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
    
        <DialogContent
         style = {{borderRadius: "5px"}}
        >
          <DialogContentText id="alert-dialog-description"  style = {{fontFamily: "Roboto",fontWeight:"normal",fontSize: "16px"}}>
          Суть быстрых задач — тратить минимум времени на их постановку. <br/>
          Впишите хотя бы один символ в название и кликните «Сохранить задачу».
          Задача появится в вашем списке задач. По умолчанию в списке отразятся одноименный проект,
           дедлайн 24 часа и имя автора в графе "Исполнитель".
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style = {{display:"flex",justifyContent:"center"}}>
          <ButtonEasy 
          onClick={handleClose} 
          style={{width: '100px', marginBottom:"10px"}}         
          >
           Понятно
          </ButtonEasy >         
        </DialogActions>
      </Dialog>
    </div>    

    {/*************************************************************** */}
                    </>
                ) : (
                    <TasksTableContent
                        updateTask={updateTask}
                        setUpdateTask={setUpdateTask}
                        // useDragHandle
                        // onSortEnd={sortEndHandler}
                        // helperClass="in_drag"
                    />
                )}
            </>
        </WrapperTasksTable>
    );
};

const mapStateToProps = (state: State) => {
    return {
        selectedTask: state.taskInfoPlate.selectedTask,
        isShownTaskInfoPlate: state.taskInfoPlate.isShownTaskInfoPlate,
        activeColumns: state.tasksPage.activeColumns,
        tasks: state.tasksPage.tasks,
        isLoading: state.tasksPage.isLoading,
        currentId: state.commonInfo.current_user,
        selectedUserId: state.tasksPage.selectedUserId,
        current_user: state.commonInfo.current_user
    };
};

const mapDispatchToProps = {
    setShownTaskInfoPlate,
    selectTask,
    changeTaskList,
    fetchTasks,
    setSelectedUserId,
    loadSpecificTask,
    FilterTemplates,
    setFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksTable);
