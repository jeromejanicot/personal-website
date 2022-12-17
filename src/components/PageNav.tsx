import { useStore } from "./articles/ArticlesStore";
import { FilterType } from "../types/types";
import styles from "./PageNav.module.css";

interface Props {
  length: number;
  page: number;
  setPage: (page: number) => void;
  increasePage: () => void;
  decreasePage: () => void;
}

const PageNav = ({
  length,
  page,
  setPage,
  increasePage,
  decreasePage,
}: Props) => {
  return (
    <div className={`${styles.page_navigation_container}`}>
      <button
        type="button"
        disabled={page === 0 ? true : false}
        className={"nav-option nav-button"}
        onClick={() => setPage(0)}
      >
        {`<<`}
      </button>
      <button
        type="button"
        disabled={page === 0 ? true : false}
        className={"nav-option nav-button"}
        onClick={() => decreasePage()}
      >
        {`<`}
      </button>
      <div>{page + 1}</div>
      <button
        type="button"
        disabled={page === 0 ? true : false}
        className={"nav-option nav-button"}
        onClick={() => increasePage()}
      >
        {`>`}
      </button>
      <button
        type="button"
        disabled={page === 0 ? true : false}
        className={"nav-option nav-button"}
        onClick={() => setPage(length - 1)}
      >
        {`>>`}
      </button>
    </div>
  );
};

export default PageNav;
