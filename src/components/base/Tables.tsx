import { Spinner, Table } from "flowbite-react";

interface columns {
  key?: string;
  label: string;
  dataKey?: string;
  return?: (i: any) => JSX.Element;
  status?: string;
}

interface TableProps {
  columns: columns[];
  data: any;
  isLoading?: boolean | undefined;
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
        {!props.isLoading && (
          <Table.Body className="divide-y">
            {props.data.map((row: any, i: number) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={i}
              >
                {props.columns.map((Column, i: number) => (
                  <Table.Cell key={i}>
                    {Column.return ? (
                      <Column.return i={row} />
                    ) : (
                      row[Column.dataKey || ""]
                    )}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table>
      {props.isLoading && (
        <div className="mt-10 w-full">
          <div role="status" className="max-w-2xl animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
