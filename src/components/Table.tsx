import React, { Dispatch, SetStateAction, useState } from "react";
import {
  MdArrowDownward,
  MdArrowUpward,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

const color = "green";

export interface Columns {
  field: string;
  headerName?: string;
  hide?: boolean;
  width?: number;
  type?: "string" | "number" | "date";
  formatter?: any;
  fixed?: boolean;
}
interface Props {
  data: any;
  columns: Columns[];
  sort: {
    field: string;
    direction: string;
  };
  setSort: Dispatch<SetStateAction<{}>>;
  result: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  loading: boolean;
  setSearch: Dispatch<SetStateAction<string>>;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  label?: string;
}
const Table: React.FC<Props> = ({
  data,
  columns,
  sort,
  setSort,
  page,
  setPage,
  limit,
  setLimit,
  result,
  loading,
  selected,
  setSelected,
  setSearch,
  label,
}) => {
  const [inputSearch, setInputSearch] = useState("");
  const handleSort = (field: string) => {
    if (sort.field !== field) {
      setSort({ field, direction: "desc" });
    } else if (sort.field === field) {
      if (sort.direction === "desc") {
        setSort({ field, direction: "asc" });
      } else if (sort.direction === "asc") {
        setSort({ field: "", direction: "" });
      }
    }
  };
  const handleLimit = (e: any) => {
    setLimit(Number(e.target.value));
    const dataPointer = (page - 1) * e.target.value + 1;
    if (dataPointer > result) {
      const pagePointer = Math.ceil(result / e.target.value);
      setPage(pagePointer);
    }
  };
  const handlePage = (e: "next" | "before") => {
    if (e === "next") {
      const maxPage = Math.ceil(result / limit);
      if (page < maxPage) {
        setPage(page + 1);
      }
    } else if (e === "before") {
      if (page > 1) {
        setPage(page - 1);
      }
    }
  };
  const handleSelection = (e: any, id: string) => {
    if (e.target.id === "span") return;

    if (selected == id) {
      setSelected(``);
    } else {
      setSelected(`${id}`);
    }
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      setSearch(inputSearch);
    }
  };
  return (
    <div>
      <div className="flex justify-end my-4 ml-auto w-60 flex-col">
        <label>Search</label>
        <input
          type="text"
          className={`border border-gray-400 border-opacity-50 px-4 py-2 focus:outline-none focus:ring-${color}-200 focus:ring-2 focus:border-${color}-400  rounded transition-colors`}
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter Search Key"
        />
        <small>{label}</small>
      </div>

      <div
        className="overflow-x-auto overflow-y-auto shadow"
        style={{ maxHeight: "80vh" }}
      >
        <table
          className="relative table-fixed border-separate min-w-full"
          style={{ borderSpacing: 0 }}
        >
          <thead>
            <tr>
              <th
                className={`sticky left-0 top-0 bg-${color}-500 border border-solid border-${color}-500 text-white z-20 cursor-pointer p-2 text-left`}
              ></th>
              {columns.map((col) => {
                if (!col.hide)
                  return (
                    <th
                      className={`sticky top-0 bg-${color}-500 border border-solid border-${color}-500 text-white z-10 cursor-pointer p-2 text-left`}
                      key={col.field}
                      onClick={() => handleSort(col.field)}
                    >
                      <div className="flex items-center">
                        {col.headerName}
                        <span className="mx-2">
                          {sort.field === col.field &&
                            (sort.direction === "desc" ? (
                              <MdArrowDownward />
                            ) : (
                              <MdArrowUpward />
                            ))}
                        </span>
                      </div>
                    </th>
                  );
              })}
            </tr>
          </thead>
          <tbody>
            {loading &&
              [...Array(limit)].map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr
                      className={`cursor-pointer relative hover:bg-${color}-500 hover:bg-opacity-25 ${
                        index % 2 === 0 ? "" : `bg-${color}-100`
                      }`}
                    >
                      <td
                        className="p-2 text-left text-gray-700 border border-gray-700 border-opacity-20"
                        style={{ maxHeight: "50px" }}
                      >
                        <input
                          type="checkbox"
                          className={`rounded text-${color}-500 form-checkbox shadow-sm  focus:ring-2 focus:ring-${color}-300`}
                        />
                      </td>
                      {columns.map((col) => {
                        if (!col.hide)
                          return (
                            <td
                              key={col.field}
                              style={{ minWidth: col.width || 150 }}
                              className="p-2 text-left text-gray-700 border border-gray-700 border-opacity-20"
                            >
                              <div
                                className={`h-4 bg-${color}-500 rounded bg-opacity-20 animate-pulse w-full`}
                              ></div>
                            </td>
                          );
                      })}
                    </tr>
                  </React.Fragment>
                );
              })}
            {!loading &&
              data.map((row: any, index: number) => {
                return (
                  <tr
                    className={`cursor-pointer relative hover:bg-${color}-500 hover:bg-opacity-25 ${
                      selected === row.id && `bg-${color}-500 bg-opacity-25`
                    }`}
                    onClick={(e) => handleSelection(e, row.id)}
                    key={row.id}
                  >
                    <td
                      style={{ maxHeight: "25px" }}
                      className={` ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-100"
                      } sticky left-0 p-2 text-left text-gray-700 border border-gray-700 z-10 border-opacity-20`}
                    >
                      <input
                        type="checkbox"
                        checked={selected == row.id ? true : false}
                        onChange={() => {}}
                        className={`rounded text-${color}-500 form-checkbox shadow-sm  focus:ring-2 focus:ring-${color}-300`}
                      />
                    </td>
                    {columns.map((col) => {
                      if (!col.hide)
                        return (
                          <td
                            key={col.field}
                            style={{ minWidth: col.width || 150 }}
                            className={`p-2 text-left text-gray-700 border border-gray-700 border-opacity-20 ${
                              col.fixed && "sticky left-0"
                            }`}
                          >
                            <span className="cursor-text">
                              {col.formatter
                                ? col.formatter(row[col.field])
                                : row[col.field]}
                            </span>
                          </td>
                        );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="my-3 mx-2 flex">
        <div className="ml-auto flex items-center">
          <div className="mr-4">
            <select
              value={limit}
              onChange={handleLimit}
              className="p-2 text-sm bg-gray-200 border border-solid border-gray-700 border-opacity-20 outline-none"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="mr-12 font-semibold text-sm">
            {loading ? (
              <div className="w-32 h-4 p-2 text-left bg-gray-300 rounded animate-pulse"></div>
            ) : (
              <>
                {(page - 1) * limit + 1} -
                {page * limit < result ? page * limit : result} / {result} Data
              </>
            )}
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handlePage("before")}
              className="border-none bg-transparent text-xl outline-none p-2 flex items-center mx-4 cursor-pointer"
            >
              <MdKeyboardArrowLeft />
            </button>
            <span>{page}</span>
            <button
              onClick={() => handlePage("next")}
              className="border-none bg-transparent text-xl outline-none p-2 flex items-center mx-4 cursor-pointer"
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
