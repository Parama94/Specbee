import styles from "./Card.module.css";
import { Stock } from "../../services/fetchStocks";
import { formatDate } from "../../utils/dateUtils";

export const Card = ({ title, image, date, body, source, author }: Stock) => {
  const imgUrl = `${import.meta.env.VITE_IMG_BASE_URL}/${image}`;
  return (
    <div>
      <div>
        <div className={styles.header}>
          <img src={imgUrl} alt="card image" />
          <div className={styles.titleContainer}>
            <div className={styles.infoContainer}>
              <p className={styles.infoText}>{formatDate(date)}</p>
              <p className={styles.infoText}>{source}</p>
            </div>
            <h3 dangerouslySetInnerHTML={{ __html: title }}></h3>
          </div>
        </div>
      </div>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }}></div>
      <p className={styles.author}>{author}</p>
      <div className={styles.divider}></div>
    </div>
  );
};
