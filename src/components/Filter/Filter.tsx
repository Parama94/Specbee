import styles from "./Filter.module.css";
import { Checkbox } from "../Checkbox/Checkbox";

export type FilterProps = {
  title: string;
  list: string[];
  filtersApplied: { [key: string]: string[] };
  onFilter: (source: string, value: string, checked: boolean) => void;
};

export const Filter: React.FC<FilterProps> = ({
  title,
  list,
  filtersApplied,
  onFilter,
}: FilterProps) => {
  const key =
    title === "Category" ? "source" : title.toLowerCase();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      {list.map((filter) => {
        return (
          <div key={crypto.randomUUID()}>
            <Checkbox
              label={filter}
              category={title}
              checked={filtersApplied[key]?.includes(filter) || false}
              onFilterChecked={onFilter}
            />
          </div>
        );
      })}
    </div>
  );
};
