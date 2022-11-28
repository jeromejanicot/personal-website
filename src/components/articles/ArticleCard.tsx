import Link from "next/link";
import type { SlugItemType } from "../../types/types";
import styles from "./ArticleCard.module.css";

interface Props {
  article: SlugItemType;
}

const ArticleCard = ({ article }: Props) => {
  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.card_content}`}>
        <Link
          as={`/articles/${article.data.slug}`}
          href={{
            pathname: "/articles/[slug]",
            query: { slug: article.data.slug },
          }}
        >
          <a className={`${styles.article_card_title}`}>{article.data.title}</a>
        </Link>
        <div className={`${styles.article_card_date}`}>
          {`//${article.data.publishedOn}`}
        </div>
        <div className={`${styles.article_card_preview}`}>
          {article.data.preview}
        </div>
        <div>
          <Link
            as={`/articles/${article.data.slug}`}
            href={{
              pathname: "/articles/[slug]",
              query: { slug: article.data.slug },
            }}
          >
            <a href={article.data.slug} className={`${styles.read_more}`}>
              Read more
            </a>
          </Link>
        </div>
      </div>
      <span className={`${styles.divider}`}></span>
    </div>
  );
};

export default ArticleCard;
