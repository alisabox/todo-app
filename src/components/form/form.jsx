import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { getEditableTask } from '../../store/selectors';
import { addTaskAction, setEditableTaskAction, editTaskAction } from '../../store/action';
import { useEffect, memo } from 'react';
import styles from './style.module.css';

const TaskForm = ({isActive, handleFormClose, tasks}) => {
  const [form] = Form.useForm();
  
  // Если в хранилище есть информация, что пользователь хочет редактировать задачу, то открываем форму в режиме редактирования
  const editableTask = useSelector(getEditableTask);

  const dispatch = useDispatch();

  // При отправке формы проверяем, что в хранилище нет задач с таким же названием и текстом.
  // Если такая задача есть, показываем alert, если нет, то добавляем задачу если она новая или редактируем, если старая
  const onSubmit = ({title, text}) => {
    const isSameTitle = tasks.filter((task) => task?.id !== editableTask?.id && task?.title === title).length > 0;
    const isSameText = tasks.filter((task) => task?.id !== editableTask?.id && task?.text === text).length >  0;
    
    if (isSameTitle) {
      alert('Заметка с таким заголовком уже существует');
      return;
    }

    if (isSameText) {
      alert('Заметка с таким текстом уже существует');
      return;
    }

    if (editableTask) {
      dispatch(editTaskAction({...editableTask, title, text}));
    } else {
      dispatch(addTaskAction({title, text}));
    }
    onReset();
  };

  // Handler очистки и закрытия формы
  const onReset = () => {
    form.resetFields();
    dispatch(setEditableTaskAction(undefined));
    handleFormClose();
  }

  // Если форма в режиме редактирования, то заполняем поля формы по данным из хранилища о редактируемой задаче
  useEffect(() => {
    form.setFieldsValue({
      title: editableTask?.title,
      text: editableTask?.text,
    });
  }, [editableTask, form])

  return (
    <Form
      className={`${styles.form} ${isActive ? styles.active : ''}`}
      form={form}
      name="addClient"
      onFinish={onSubmit}
      scrollToFirstError
    >

      {
        editableTask 
          ? <h2>Редактировать заметку</h2> 
          : <h2>Новая заметка</h2>
      }
      
      <Form.Item
        name="title"
        label="Заголовок"
        rules={[
          {
            required: true,
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="text"
        label="Текст"
        rules={[
          {
            required: true,
            whitespace: true,
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">{editableTask ? 'Обновить' : 'Добавить'}</Button>
        <Button htmlType="button" onClick={onReset}>Отменить</Button>
      </Form.Item>
    </Form>
  );
};

export default memo(TaskForm);