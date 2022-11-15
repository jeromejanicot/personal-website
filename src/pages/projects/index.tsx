import React, { useEffect, useState } from "react";
import ProjectCard from "../../components/projects/ProjectCard";
import { SlugItemType, FrontmatterFields } from "../../types/types";
import { GetStaticProps } from "next";
import { projectsDirectory, projectFilesPaths } from "../../lib/getBlog";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import ProjectsFilters from "../../components/projects/ProjectsFilters";
import { paginateData } from "../../lib/usePagination";
import { useStore } from "../../components/projects/ProjectsStore";
import { dateSorter, checkboxClean } from "../../lib/filterUtils";
import styles from "../../components/projects/Projects.module.css";
import PageNav from "../../components/PageNav";

interface Props {
  allProjects: SlugItemType[];
}

export default function Projects(props: Props){
  const { allProjects } = props;
  const [pageData, setPageData] = useState<SlugItemType[][]>();
  const [length, setLength] = useState<number>(0);

  const {
    page,
    perPage,
    date,
    web,
    design,
    engineering,
    setPage,
    increasePage,
    decreasePage,
  } = useStore();

  useEffect(() => {
    window.addEventListener("beforeunload", checkboxClean);

    const filteredProjects = ((): SlugItemType[] => {
      const dateSortedProjects = dateSorter(allProjects, date);

      let filters: string[] = [];

      if (web) {
        filters.push("web");
      }
      if (engineering) {
        filters.push("engineering");
      }
      if (design) {
        filters.push("design");
      }

      let filteredProjects: SlugItemType[];
      if (web || engineering || design) {
        return (filteredProjects = dateSortedProjects.filter((article) =>
          filters.every((filter) => article.data.tags.includes(filter))
        ));
      }

      return dateSortedProjects;
    })();

    setPageData(paginateData(filteredProjects, perPage));
    if (pageData !== undefined) {
      setLength(pageData.length);
    }
  }, [date, web, engineering, design, allProjects]);

  return pageData !== undefined && pageData[page] !== undefined ? (
    <div className={`${styles.projects_page_container}`}>
      <div className={`${styles.cards_filters_container}`}>
        <div className={`${styles.project_cards_container}`}>
          {pageData[page]?.map((project, index) => (
            <div key={index}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        <div>
          <ProjectsFilters />
          <PageNav
            length={length}
            page={page}
            setPage={setPage}
            increasePage={increasePage}
            decreasePage={decreasePage}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className={`${styles.projects_page_container}`}>
      <div className={`${styles.cards_filters_container}`}>
        <div className={`${styles.project_card_container}`}>
          <h1>No projects found</h1>
        </div>
        <div>
          <ProjectsFilters />
          <PageNav
            length={length}
            page={page}
            setPage={setPage}
            increasePage={increasePage}
            decreasePage={decreasePage}
          />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allProjects = projectFilesPaths.map((filePath) => {
    const source = fs.readFileSync(path.join(projectsDirectory, filePath));

    const { content, data } = matter(source);
    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { allProjects } };
};
