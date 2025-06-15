export const styles = {
  homeOuter: "flex justify-center min-h-screen",
  homeWidthMd:"w-full max-w-screen-md h-screen flex flex-col gap-5 p-5 ",
  section: "flex flex-col flex-1 md:flex-row rounded-sm",
  
  h1: "w-auto text-xl text-slate-700 font-bold",
  incompleteArea:"flex flex-col flex-1 overflow-y-auto bg-gray-100 text-left p-4 rounded-sm shadow-md md:mb-0",
  listArea: "bg-white  h-full rounded-sm  shadow-md",
  listUl:"flex flex-col gap-2 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 list-disc",

  item: "flex justify-start border-gray-50 py-2 px-2 border-b border-slate-200",
  detailTitle: "content-center font-bold text-base",
  detailDate: "flex self-center",
  
  buttonArea: "flex justify-end gap-2",
  buttonComplete: "bg-blue-500 hover:bg-blue-600 cursor-pointer text-base text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300",
  buttonDelete: "bg-red-500 hover:bg-red-600 cursor-pointer text-base text-white font-semibold py-2 px-4 rounded shadow-md hover:shadow-lg transition duration-300",
  
  addTodoInput: "w-full outline-none ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-0 focus:border-stone-400 focus:ring-0",

};
