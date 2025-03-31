import { Todo, TodoId } from "@/types/todo.type";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";

const TodoItem = ({
  item,
  handleUpdate,
  handleDelete,
}: {
  item: Todo;
  handleUpdate: (id: TodoId) => void;
  handleDelete: (id: TodoId) => void;
}) => {
  const { id, label, status } = item;
  return (
    <TableRow data-testid="row">
      <TableCell>{label}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell className="flex justify-end">
        <Button
          onClick={() => handleUpdate(id)}
          style={{
            cursor: "pointer",
          }}
        >
          Modifier
        </Button>
        <Button
          onClick={() => handleDelete(id)}
          style={{
            cursor: "pointer",
          }}
          data-testid="delete-button"
          variant="destructive"
        >
          Supprimer
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TodoItem;
