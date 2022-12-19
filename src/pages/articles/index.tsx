import React, { useMemo } from "react";
import { Filters, SlugItemType } from "../../types/types";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import ArticleCard from "./../../components/articles/ArticleCard";
import { articlesDirectory, articleFilesPaths } from "../../lib/getBlog";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { useStore } from "../../components/articles/ArticlesStore";
import { dateSorter, checkboxClean } from "../../lib/filterUtils";
import { paginateData } from "../../lib/usePagination";
import styles from "../../components/articles/Articles.module.css";
import FilterComponent from "../../components/Filters";
import PageNav from "../../components/PageNav";

interface Props {
  allArticles: SlugItemType[];
}

const filtersList: Filters[] = ["web", "design", "engineering"];

export default function Articles(props: Props) {
  const { allArticles } = props;
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

  const memoDateSorted = useMemo(
    () => dateSorter(allArticles, date),
    [allArticles, date]
  );

  if (Array.isArray(filters)) {
    console.log("filters is an array");
  }

  const memoFilterSorted = useMemo(
    () =>
      memoDateSorted.filter((article) =>
        filters.every((filter) => article.data.tags.includes(filter))
      ),
    [memoDateSorted, filters]
  );

  const memoPages = useMemo(
    () => Math.ceil(memoFilterSorted.length / perPage),
    [memoFilterSorted, perPage]
  );

  useEffect(() => {
    window.addEventListener("beforeunload", checkboxClean);
    setPageData(paginateData(memoFilterSorted, perPage));
    setLength(memoPages);
  }, [memoFilterSorted, perPage, memoPages]);

  console.debug(filters);

  return pageData && pageData[page] ? (
    <div className={`${styles.articles_page_container}`}>
      <div className={`${styles.cards_filters_container}`}>
        <div className={`${styles.article_card_container}`}>
          {pageData[page]?.map((article, index) => (
            <div key={index}>
              <ArticleCard article={article} />
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
    <div className={`${styles.articles_page_container}`}>
      <div className={`${styles.cards_filters_container}`}>
        <div className={`${styles.article_card_container}`}>
          <h1>No articles found</h1>
        </div>
        <div className={`${styles.filter_navigation_container}`}>
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
  const allArticles = articleFilesPaths.map((filePath) => {
    const source = fs.readFileSync(path.join(articlesDirectory, filePath));
    const { data } = matter(source);

    return {
      data,
      filePath,
    };
  });

  return { props: { allArticles } };
};
