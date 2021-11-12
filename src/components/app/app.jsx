import { Button } from 'antd';
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getTasks, getDoneTasks } from '../../store/selectors';
import CardComponent from '../card/card';
import TaskForm from '../form/form';
import styles from './style.module.css';

function App () {

  // Получаем список всех задач и выполненных задач из хранилища
  const tasks = useSelector(getTasks);
  const doneTasks = useSelector(getDoneTasks);

  const [activeForm, setActiveForm] = useState(false);

  // Хук для открытия / закрытия формы создания задачи
  const handleFormStateChange = useCallback(() => {
    setActiveForm((prevState) => !prevState);
  }, []);

  return (
    <>
      <div className={styles.header}>
        <Button type="primary" htmlType="button" onClick={handleFormStateChange}>Добавить задачу</Button>
        <div className={styles.counts}>
          <p>Всего задач: {tasks.length}</p>
          <p className={styles.green}>Выполнено: {doneTasks.length}</p>
          <p className={styles.red}>Осталось: {tasks.length - doneTasks.length}</p>
        </div>
      </div>
      <div className={styles.list}>
        {
          tasks?.map((task) =>
            <CardComponent key={task.id} handleTaskEdit={handleFormStateChange} task={task}/>
          )
        }
      </div>
      <TaskForm isActive={activeForm} handleFormClose={handleFormStateChange} tasks={tasks}/>
    </>
  )
}

export default App;