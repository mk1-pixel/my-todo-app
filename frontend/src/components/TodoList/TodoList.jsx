import { useEffect, useMemo, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { TodoListHeader } from "../TodoListHeader/TodoListHeader";
import { TodoListItems } from "../TodoListItems/TodoListItems";
import { styles } from "./TodoList.module";
import css from "./TodoList.module.css";

export default function Incomplete({
  incomplete,
  complete,
  changeDisplay,
  handleState,
  onClickBack,
  loading,
}) {
  return (
    <>
      <div className={styles.incompleteArea}>
        <TodoListHeader
          handleState={handleState}
          changeDisplay={changeDisplay}
        />
        <PaginatedItems
          key={incomplete.length}
          itemsPerPage={5}
          incomplete={incomplete}
          complete={complete}
          changeDisplay={changeDisplay}
          onClickBack={onClickBack}
          loading={loading}
        />
      </div>
    </>
  );
}
function PaginatedItems({
  itemsPerPage,
  incomplete,
  complete,
  changeDisplay,
  onClickBack,
  loading,
}) {
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const prevFlag = useRef(changeDisplay);
  const derivedArray = useMemo(() => {
    return changeDisplay ? incomplete : complete;
  }, [changeDisplay, incomplete, complete]);

  useEffect(() => {
    if (changeDisplay !== prevFlag.current) {
      setItemOffset(0);
      prevFlag.current = changeDisplay;
    }
    const endOffset = itemOffset + itemsPerPage;
    const sliced = derivedArray.slice(itemOffset, endOffset);
    setCurrentItems(sliced);
    setPageCount(Math.ceil(derivedArray.length / itemsPerPage));
  }, [itemOffset, derivedArray, itemsPerPage, changeDisplay]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % derivedArray.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <TodoListItems
        currentItems={currentItems}
        changeDisplay={changeDisplay}
        onClickBack={onClickBack}
        loading={loading}
      />
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName={css.li}
        pageLinkClassName="page-link"
        previousClassName="previous"
        previousLinkClassName="page-link"
        nextClassName="next"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName={css.pagination}
        activeClassName={css.active}
        renderOnZeroPageCount={null}
      />
    </>
  );
}
