import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css"

export const Navbar = () => {
  const router = useRouter();
  console.log(router.pathname);

  return (
    <div className={`${styles.navbar_container}`}>
      <div className={`${styles.navbar_title}`}>Jerome Janicot</div>
      <div className={`${styles.navbar_menu_container}`}>
        <Link href="/projects">
          <a
            className={
              router.pathname.startsWith("/projects")
                ? `${styles.active_menu_item}`
                : `${styles.menu_item}`
            }
          >
            Projects
          </a>
        </Link>
        <Link href="/articles">
          <a
            className={
              router.pathname.startsWith("/articles")
                ? `${styles.active_menu_item}`
                : `${styles.menu_item}`
            }
          >
            Articles
          </a>
        </Link>
        <Link href="/about">
          <a
            className={
              router.pathname === "/about" ? `${styles.active_menu_item}` : `${styles.menu_item}`
            }
          >
            About
          </a>
        </Link>
      </div>
    </div>
  );
};