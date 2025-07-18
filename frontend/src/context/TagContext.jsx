import { createContext, useContext,  useState } from "react";

const TagContext = createContext();

export const TagProvider = ({children}) => {
  const [tags, setTags] = useState(["test", "test"]);

  return(
    <TagContext.Provider value={{tags, setTags}} >
      {children}
    </TagContext.Provider>
  )
}

export const useTags = () => useContext(TagContext)