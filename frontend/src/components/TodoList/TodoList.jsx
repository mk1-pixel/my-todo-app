import { useEffect, useState } from "react";
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
}) {
  function PaginatedItems({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      const derivedArray = changeDisplay ? [...incomplete] : [...complete];
      const newCurrentItems = derivedArray.slice(itemOffset, endOffset);
      setCurrentItems(newCurrentItems);
      setPageCount(Math.ceil(derivedArray.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, changeDisplay, incomplete, complete]);

    const handlePageClick = (event) => {
      const derivedArray = changeDisplay ? [...incomplete] : [...complete];
      const newOffset = (event.selected * itemsPerPage) % derivedArray.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <TodoListItems
          currentItems={currentItems}
          changeDisplay={changeDisplay}
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

  return (
    <>
      <div className={styles.incompleteArea}>
        <TodoListHeader
          handleState={handleState}
          changeDisplay={changeDisplay}
        />
        <PaginatedItems itemsPerPage={5} />
      </div>
    </>
  );
}
