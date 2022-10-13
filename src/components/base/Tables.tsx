import { Table } from "flowbite-react";


interface columns {
  key: string;
  label: string;
  dataKey?: string;
  return?: (i:any)=> JSX.Element;
  status?: string;
}

interface TableProps {
  columns: columns[];
  data: any;
}

export default function Tables(props: TableProps) {
  return (
    <div className="w-full  py-4">
      <Table>
        <Table.Head>
          {props.columns.map((column, i: number) => (
            <Table.HeadCell key={i}>{column.label}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {props.data.map((row: any, i: number) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={i}
            >
              {props.columns.map((Column, i: number) => (
                <Table.Cell key={i}>{Column.return? <Column.return i={row} />: row[Column.dataKey || '']}</Table.Cell> 
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}