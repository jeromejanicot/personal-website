import {useStore} from "./ArticlesStore";
import styles from "./Articles.module.css"

const ArticlesFilters = () => {

    const setDate = useStore(state => state.setDate);
    const setTags = useStore(state => state.setTags);

    return (
        <div className={`${styles.filter_section_container}`}>
            <div className={`${styles.filter_section}`}>
                <h3>Date</h3>
                <input
                    type="radio"
                    id="newest"
                    name="date"
                    value="newest"
                    defaultChecked={true}
                    onClick={() => setDate(true)}
                    className={`${styles.tag}`}
                />
                <label htmlFor="newest" className={`${styles.radio_ns} ${styles.radio_s1}`}>
                    newest
                </label>
                <input
                    onClick={() => setDate(false)}
                    type="radio"
                    id="oldest"
                    name="date"
                    value="oldest"
                    className={`${styles.tag}`}
                />
                <label htmlFor="oldest" className={`${styles.radio_ns} ${styles.radio_s1}`}>
                    oldest
                </label>
            </div>
            <div className={`${styles.filter_section}`}>
                <h3>Tags</h3>
                <input
                    onClick={() => setTags("web")}
                    type="checkbox"
                    id="web"
                    name="tags"
                    value="web"
                    className={`${styles.tag}`}
                />
                <label htmlFor="web" className={`${styles.filter_checkbox}`}>
                    web
                </label>
                <input
                    onClick={() => setTags("engineering")}
                    type="checkbox"
                    id="engineering"
                    name="tags"
                    value="engineering"
                    className={`${styles.tag}`}
                />
                <label htmlFor="engineering" className={`${styles.filter_checkbox}`}>
                    engineering
                </label>
                <input
                    onClick={() => setTags("design")}
                    type="checkbox"
                    id="design"
                    name="tags"
                    value="design"
                    className={`${styles.tag}`}
                />
                <label htmlFor="design" className={`${styles.filter_checkbox}`}>
                    design
                </label>
            </div>
        </div>
    )
}

export default ArticlesFilters;