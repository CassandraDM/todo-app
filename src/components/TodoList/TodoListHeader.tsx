import { TableHead, TableHeader, TableRow } from "../ui/table";

const TodoListHeader = ({ fields }: { fields: string[] }) => {
  return (
    <TableHeader>
      <TableRow>
        {fields.map((field) => (
          <TableHead key={field}>{field}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default TodoListHeader;
