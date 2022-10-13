import { Avatar } from "flowbite-react";
import React, { useState } from "react";

import { PencilIcon } from "@heroicons/react/24/outline";

interface InputProps {
  label: string;
  form: "solid" | "underline";
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week"
    | "url"
    | "search"
    | "tel"
    | "color"
    | "range"
    | "file"
    | "checkbox"
    | "radio"
    | "submit"
    | "reset"
    | "button"
    | "image"
    | "hidden"
    | "datetime"
    | "textarea";
  placeholder?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
  return (
    <div className="flex flex-col w-full">
      {props.form === "solid" ? (
        <>
          <label className="text-gray-600 dark:text-gray-200">
            {props.label}
          </label>
          <input
            name={props.name}
            type={props.type}
            className={`border border-gray-300 dark:border-gray-600 rounded-md p-2 ${
              props.form === "solid" ? "bg-gray-100 dark:bg-gray-700" : ""
            }`}
            placeholder={props.placeholder}
            value={props.value}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
          />
        </>
      ) : (
        <>
          <div className="relative z-0 mb-6 w-full group">
            <input
              name={props.name}
              type={props.type}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder={props.placeholder || " "}
              value={props.value}
              defaultValue={props.defaultValue}
              onChange={props.onChange}
              required={props.required ? true : false}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {props.label} {props.required ? "*" : ""}
            </label>
          </div>
        </>
      )}
    </div>
  );
}

{
  /* <script>
  var loadFile = function(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  };
</script> */
}
interface prosp {
  onChange?: (event: any) => void;
  name?: string;
}
export function AvatarInput(props: prosp) {
  const [image, setImage] = useState("");
  return (
    <div className="">
      <label className="">
        <input
          name={props.name}
          type="file"
          accept="image/png, image/gif, image/jpeg"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              let img = e.target.files[0];
              setImage(URL.createObjectURL(img));
              if (props.onChange) {
                props.onChange(e.target.files[0]);
              }
            }
          }}
        />
        <div className="hover:brightness-50 transition-all ">
          <Avatar rounded stacked={true} size="xl" img={image} />
        </div>
      </label>
    </div>
  );
}
