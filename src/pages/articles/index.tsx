import React, { useCallback, useLayoutEffect, useMemo } from "react";
import { SlugItemType } from "../../types/types";
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
import ArticlesFilters from "../../components/articles/ArticlesFilters";
import PageNav from "../../components/PageNav";

interface Props {
  allArticles: SlugItemType[];
}

export default function Articles(props: Props) {
  const { allArticles } = props;
  const [processArticles, setProcessArticles] = useState(allArticles);
  const [pageData, setPageData] = useState<SlugItemType[][]>();
  const [length, setLength] = useState<number>(0);
  const date = useStore((state) => state.date);
  const filtersStore = useStore((state) => state.filters);

  let filters = useMemo(() => filtersStore, [filtersStore]);

  const { page, setPage, perPage, increasePage, decreasePage } = useStore();

  useCallback(() => {
    let datedArticles = dateSorter(allArticles, date);
    setProcessArticles(datedArticles);
  }, [date]);

  useCallback(() => {
    let filteredArticles = processArticles.filter((article) =>
      filters.every((filter) => article.data.tags.includes(filter))
    );
    setProcessArticles(filteredArticles);
  }, [filters]);

  if (pageData?.length) {
    setLength(pageData.length);
  }

  useEffect(() => {
    window.addEventListener("beforeunload", checkboxClean);

    setPageData(paginateData(processArticles, perPage));
  }, [processArticles, perPage]);

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
          <ArticlesFilters />
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
          <ArticlesFilters />
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
