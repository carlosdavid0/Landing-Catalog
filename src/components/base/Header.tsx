import React from "react";

interface Props {
  Page: string;
  back?: boolean | null;
  add?: () => void;
  render?: JSX.Element | null;
}

import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid";

export default function Header(props: Props) {
  document.title = `${props.Page} | Comercial Angelim`;
  return (
    <header className="flex items-center justify-between mt-3.5 mb-4">
      <div className="flex items-center gap-2">
        {props.back && (
          <ArrowLeftIcon className="h-5 w-5 font-bold dark:text-gray-400" />
        )}
        <h1 className="text-4xl dark:text-gray-300">{props.Page}</h1>

        {props.add && (
          <button
            onClick={props.add}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <PlusIcon className="h-5 w-5 font-bold dark:text-gray-400" />
          </button>
        )}
      </div>
      {props.render && props.render}
    </header>
  );
}

{
  /* <header className="flex items-center justify-between mt-3.5 mb-4">
<Header Page="Vendas" />
  
</header> */
}
