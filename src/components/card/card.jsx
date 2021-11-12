import { memo } from 'react';
import {  Card  } from 'antd';
import {  EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { removeTaskAction, editTaskAction, setEditableTaskAction } from '../../store/action';
import styles from './style.module.css';

// Карточка одной задачи
function CardComponent ({handleTaskEdit, task}) {

  const dispatch = useDispatch();

  // Отправляем запрос на удаление задачи из хранилища
  const handleClientDelete = () => {
    dispatch(removeTaskAction(task.id));
  }

  // Сохраняем в хранилище информацию, что пользователь хочет редактировать задачу и открываем форму
  const onClientEdit = () =>  {
    dispatch(setEditableTaskAction(task))
    handleTaskEdit();
  }

  // Сохраняем в хранилище информацию, что задача выполнена
  const handleDoneClick = () => {
    dispatch(editTaskAction({...task, isDone: !task.isDone}));
  };

  return (

    <Card
      style={{ width: 300 }}
      actions={[
        <DeleteOutlined key="delete" onClick={handleClientDelete}/>,
        <EditOutlined key="edit" onClick={onClientEdit}/>,
      ]}
      hoverable
    > 
      <CheckOutlined
        className={`${styles.done} ${task.isDone ? styles.active : ''}`}
        onClick={handleDoneClick}
      />
      <div className={`${styles.text} ${task.isDone ? styles.activeText : ''}`}>
        <h2>{task.title}</h2>
        <div>{task.text}</div>
        <div className={styles.date}>Время создания: {task.time}</div>
      </div>
    </Card>
  )
}

export default memo(CardComponent);