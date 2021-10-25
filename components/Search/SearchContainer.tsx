import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { Params } from "../../common/types";
import {
  selectSearchCol,
  selectSearchText,
  setSearchCol,
  setSearchText,
} from "../../state/optionsSlice";
import styles from "./Search.module.scss";

interface SearchContainerProps {}

export const SearchContainer: React.FC<SearchContainerProps> = ({}) => {
  const dispatch = useAppDispatch();

  // data from redux
  const searchCol = useAppSelector(selectSearchCol);
  const searchText = useAppSelector(selectSearchText);

  // this is changed in the input
  const [searchInput, setSearchInput] = useState<string>(searchText);
  // const [searchColSelect, setSearchColSelect] = useState<Params>(searchCol);

  const selectRef = useRef<HTMLSelectElement>(null);

  const selectFieldsStrings = Object.values(Params);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSearchCol(e.target.value as Params | undefined));
  };

  const dispatchSearchText = (searchText: string) => {
    dispatch(setSearchText(searchText));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce((value) => dispatchSearchText(value), 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    debouncedSave(e.target.value);
  };

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(e.target.value));
  };

  useEffect(() => {}, [searchCol]);

  // initialise previous input and select option from redux
  useEffect(() => {
    // setSearchInput(searchText);
    selectRef.current!.value = searchCol as string;
  }, []);

  // TODO: возможно, не стоит делать undefined, а просто ничего не искать, когда у нас пользователь не ввел ничего

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={searchInput}
        placeholder={`Search for characters with specific ${searchCol}`}
      />
      <div className={styles.selectContainer}>
        <span>Column:</span>
        <select
          onChange={handleSelectChange}
          ref={selectRef}
          value={searchCol}
          className={styles.selectMenu}
        >
          {selectFieldsStrings.map((el, idx) => (
            <option value={Params[el]} key={idx + el}>
              {el}
            </option>
          ))}
        </select>
        {/* <span className={styles.customArrow} /> */}
      </div>
    </div>
  );
};
