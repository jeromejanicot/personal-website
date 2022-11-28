import Link from "next/link";
import Image from "next/image";
import { SlugItemType } from "../../types/types";
import styles from "./ProjectCard.module.css";

interface Props {
  project: SlugItemType;
}

const ProjectCard = ({ project }: Props) => {
  return (
    <div className={`${styles.project_card_container}`}>
      <div className={`${styles.project_header}`}>
        {/* need to host my own images somewhere not to annyoing bc of loader for this one
          src="https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" */}

        <img
          src="https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt=""
        />
      </div>
      <div className={`${styles.project_body}`}>
        <Link
          as={`/projects/${project.data.slug}`}
          href={{
            pathname: "/projects/[slug]",
            query: { slug: project.data.slug },
          }}
        >
          <a className={`${styles.project_card_link}`}>
            <h3>Project {project.data.title}</h3>
          </a>
        </Link>

        <article
          className={`${styles.project_card_child} ${styles.project_card_preview}`}
        >
          {project.data.preview}
        </article>
      </div>
    </div>
  );
};

export default ProjectCard;
