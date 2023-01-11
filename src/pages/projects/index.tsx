import React, { useEffect, useState, useMemo } from "react";
import ProjectCard from "../../components/projects/ProjectCard";
import { Filters, SlugItemType } from "../../types/types";
import { GetStaticProps } from "next";
import { projectsDirectory, projectFilesPaths } from "../../lib/getBlog";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import FilterComponent from "../../components/Filters";
import { paginateData } from "../../lib/getPagination";
import { useStore } from "../../components/projects/ProjectsStore";
import { dateSorter, useFilter } from "../../lib/filterUtils";
import styles from "../../components/projects/Projects.module.css";
import PageNav from "../../components/PageNav";

interface Props {
  allProjects: SlugItemType[];
}

const filtersList: Filters[] = ["web", "design", "engineering"];

export default function Projects(props: Props) {
  const { allProjects } = props;
  const [pageData, setPageData] = useState<SlugItemType[][]>();
  const [length, setLength] = useState<number>(0);
  const {
    date,
    setDate,
    page,
    setPage,
    perPage,
    increasePage,
    decreasePage,
    addTags,
    rmTags,
    filters,
  } = useStore();

  useFilter(allProjects, date, filters, perPage, setPageData, setLength);
  console.log(pageData);

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
          <FilterComponent
            setDate={setDate}
            filtersList={filtersList}
            activeFilters={filters}
            addTags={addTags}
            rmTags={rmTags}
          />
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
          <FilterComponent
            setDate={setDate}
            filtersList={filtersList}
            activeFilters={filters}
            addTags={addTags}
            rmTags={rmTags}
          />
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
}

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
