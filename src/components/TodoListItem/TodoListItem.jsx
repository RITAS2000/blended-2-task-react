import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import GridItem from '../GridItem/GridItem';
import Text from '../Text/Text';
import style from './TodoListItem.module.css';
const TodoListItem = ({ text, id, count, onDelete, onOpen }) => {
  return (
    <GridItem>
      <div className={style.box}>
        <Text textAlign="center" marginBottom="20">
          TODO #{count}
        </Text>
        <Text>{text}</Text>
        <button
          className={style.deleteButton}
          type="button"
          onClick={() => {
            onDelete(id);
          }}
        >
          <RiDeleteBinLine size={24} />
        </button>
        <button
          className={style.editButton}
          type="button"
          onClick={() => {
            onOpen(id);
          }}
        >
          <RiEdit2Line size={24} />
        </button>
      </div>
    </GridItem>
  );
};

export default TodoListItem;
// RiEdit2Line;
