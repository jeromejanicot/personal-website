import { useStore } from "./articles/ArticlesStore";
import { FilterType } from "../types/types";

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
  console.log(page);
  return (
    <div className="page-navigation-container">
      <button
        type="button"
        disabled={page === 0 ? true : false}
        className={"nav-option nav-button"}
        onClick={() => setPage(0)}
      >
        (--)
      </button>
      <button
        type="button"
        disabled={page === 0 ? true : false}
        className={"nav-option nav-button"}
        onClick={() => decreasePage()}
      >
        (-)
      </button>
      <button
        type="button"
        disabled={page === 0 ? true : false}
        className={"nav-option nav-button"}
        onClick={() => increasePage()}
      >
        (+)
      </button>
      <button
        type="button"
        disabled={page === 0 ? true : false}
        className={"nav-option nav-button"}
        onClick={() => setPage(length - 1)}
      >
        (++)
      </button>
    </div>
  );
};

export default PageNav;
