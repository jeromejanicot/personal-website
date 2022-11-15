import { useStore } from "./ProjectsStore";

interface Props {
  length: number;
}

const ProjectPageNav = (props: Props) => {
  const { length } = props;
  const state = useStore();

  return (
    <div className="page-navigation-container">
      <span
        className={
          state.page == 0 ? "grey-option nav-button" : "nav-option nav-button"
        }
        onClick={() => state.setPage(0)}
      >
        (--)
      </span>
      <span
        className={
          state.page == 0 ? "grey-option nav-button" : "nav-option nav-button"
        }
        onClick={() => state.decreasePage()}
      >
        (-)
      </span>
      <span
        className={
          state.page == length - 1
            ? "grey-option nav-button"
            : "nav-option nav-button"
        }
        onClick={() => state.increasePage()}
      >
        (+)
      </span>
      <span
        className={
          state.page == length - 1
            ? "grey-option nav-button"
            : "nav-option nav-button"
        }
        onClick={() => state.setPage(length - 1)}
      >
        (++)
      </span>
    </div>
  );
};

export default ProjectPageNav;
