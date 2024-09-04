import styles from "./Checkbox.module.css";

type CheckboxProps = {
  label: string;
  category: string;
  checked: boolean;
  onFilterChecked: (source: string, name: string, isChecked: boolean) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  category,
  checked,
  onFilterChecked,
}) => {
  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    let selectedCategory = category.toLowerCase();
    if (category === "Category") selectedCategory = "source";

    onFilterChecked(selectedCategory, name, checked);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={label}
        name={label}
        checked={checked}
        onChange={onCheckboxChange}
      ></input>
      <div className={styles.sortContainer}>
        <label htmlFor={label}>{label}</label>
      </div>
      <br />
    </div>
  );
};
