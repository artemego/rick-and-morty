import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  useAppDispatch,
  useAppSelector,
  usePrevious,
} from "../../common/hooks";
import {
  selectPage,
  nextPage,
  prevPage,
  selectScrollY,
  setScrollY,
  setPage,
  selectSearchCol,
  selectSearchText,
} from "../../state/optionsSlice";
import { getItems, selectChars, selectInfo } from "../../state/tableSlice";
import { ChTable, ChTableMemo } from "./ChTable";
import styles from "./Table.module.scss";
import { TableButton } from "./TableButton";
import debounce from "lodash.debounce";
import { IInfo, IParams } from "../../common/types";
import { ClipLoader } from "react-spinners";

interface ChTableProps {}

export const ChTableContainer: React.FC<ChTableProps> = ({}) => {
  const dispatch = useAppDispatch();
  const chars = useAppSelector(selectChars);
  const info = useAppSelector(selectInfo);
  const page = useAppSelector(selectPage);
  const loading = useAppSelector((state) => state.table.loading);
  const error = useAppSelector((state) => state.table.error);

  // options data from redux
  const scrollY = useAppSelector(selectScrollY);
  const searchCol = useAppSelector(selectSearchCol);
  const searchText = useAppSelector(selectSearchText);

  const [pageInput, setPageInput] = useState<number>(page);
  const [pageError, setPageError] = useState<boolean>(false);

  const tablePageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef<boolean | null>(true);

  const isFirstPage = page === 1;
  const isLastPage = page === info.pages;

  const previousColumn = usePrevious(searchCol);

  useEffect(() => {
    window.scrollTo(0, scrollY);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isFirstRender.current) handleScrollReset(tablePageRef);
    const params: IParams = { [searchCol]: searchText };
    dispatch(getItems({ page, params }));

    // set page input
    setPageInput(page);
    setPageError(false);
  }, [dispatch, page]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // don't get new items if we go back from another page (on first render)
    // don't get new items if the input text is blank and search column changed
    const columnChangedAndNoText = previousColumn != searchCol && !searchText;

    if (!isFirstRender.current && !columnChangedAndNoText) {
      const params: IParams = { [searchCol]: searchText };
      dispatch(getItems({ page: 1, params }));
      dispatch(setPage(1));
    }

    isFirstRender.current = false;
  }, [searchCol, searchText]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleScrollReset = (
    tablePageRef: React.RefObject<HTMLDivElement>
  ): void => {
    tablePageRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const handleNextClick = () => {
    return page < info.pages && dispatch(nextPage());
  };
  const handlePrevClick = () => {
    return page > 1 && dispatch(prevPage());
  };

  const handleRowClick = useCallback(() => {
    dispatch(setScrollY(window.pageYOffset));
  }, [dispatch]);

  const dispatchPageWithCheck = (nextPageNum: number, info: IInfo) => {
    // check for page validity
    if (nextPageNum >= 1 && nextPageNum <= info.pages)
      dispatch(setPage(nextPageNum));
    else {
      new Error("Error in set page");
      setPageError(true);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce((value, info) => dispatchPageWithCheck(value, info), 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextPageNum = +e.target.value.replace(/\D/, "");
    setPageInput(nextPageNum);
    debouncedSave(nextPageNum, info);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setPageInput(page);
    setPageError(false);
  };

  return (
    <div className={styles.tablePageWrapper} ref={tablePageRef}>
      {!chars.length ? (
        <div className={styles.blankContainer}>
          {loading && <ClipLoader loading={loading} size={24} color="orange" />}
          {!error && !loading ? (
            <div>
              No characters were found with{" "}
              <span>
                {searchCol} &quot;{searchText}
                &quot;
              </span>
            </div>
          ) : (
            <div className={styles.errorContainer}>{error}</div>
          )}
        </div>
      ) : (
        <ChTableMemo chars={chars} handleRowClick={handleRowClick} />
      )}

      {!!chars.length && (
        <div className={styles.buttonBlock}>
          <div className={`wrapper ${styles.buttonWrapper}`}>
            <TableButton
              handleClick={handlePrevClick}
              tableButtonType="prev"
              disabled={isFirstPage}
            />
            <TableButton
              handleClick={handleNextClick}
              tableButtonType="next"
              disabled={isLastPage}
            />
            <div className={styles.infoBlock}>
              <input
                ref={inputRef}
                type="text"
                pattern="[0-9]*"
                className={`${styles.infoBlockInput} ${
                  pageError && styles.infoBlockInputError
                }`}
                value={pageInput}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <div>/{info.pages}</div>
            </div>
            <div className={styles.loadingBlock}>
              <ClipLoader loading={loading} size={24} color="orange" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
