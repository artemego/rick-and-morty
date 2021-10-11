import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import {
  selectPage,
  nextPage,
  prevPage,
  selectScrollY,
  setScrollY,
  setPage,
} from '../../state/optionsSlice';
import { getItems, selectChars, selectInfo } from '../../state/tableSlice';
import { ChTable } from './ChTable';
import styles from './Table.module.scss';
import { TableButton } from './TableButton';
import debounce from 'lodash.debounce';
import { IInfo } from '../../common/types';

interface ChTableProps {}

export const ChTableContainer: React.FC<ChTableProps> = ({}) => {
  const dispatch = useAppDispatch();
  const chars = useAppSelector(selectChars);
  const info = useAppSelector(selectInfo);
  const page = useAppSelector(selectPage);
  const loading = useAppSelector((state) => state.table.loading);
  const scrollY = useAppSelector(selectScrollY);
  const [pageInput, setPageInput] = useState<number>(page);
  const [pageError, setPageError] = useState<boolean>(false);

  const tableRef = useRef<HTMLTableElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef<boolean | null>(true);

  const isFirstPage = page === 1;
  const isLastPage = page === info.pages;
  useEffect(() => {
    window.scrollTo(0, scrollY);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isFirstRender.current) handleScrollReset(tableRef);
    dispatch(getItems(page));
    isFirstRender.current = false;
    // set page input
    setPageInput(page);
    setPageError(false);
  }, [dispatch, page]);

  const handleScrollReset = (
    tableRef: React.RefObject<HTMLTableElement>
  ): void => {
    tableRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  const handleNextClick = () => {
    return page < info.pages && dispatch(nextPage());
  };
  const handlePrevClick = () => {
    return page > 1 && dispatch(prevPage());
  };

  const handleRowClick = () => {
    dispatch(setScrollY(window.pageYOffset));
  };

  const dispatchPageWithCheck = (nextPageNum: number, info: IInfo) => {
    // check for page validity
    console.log(nextPageNum, info);

    if (nextPageNum >= 1 && nextPageNum <= info.pages)
      dispatch(setPage(nextPageNum));
    else {
      new Error('Error in set page');
      setPageError(true);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce((value, info) => dispatchPageWithCheck(value, info), 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextPageNum = +e.target.value.replace(/\D/, '');
    console.log(nextPageNum);
    setPageInput(nextPageNum);
    debouncedSave(nextPageNum, info);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setPageInput(page);
    setPageError(false);
  };

  return (
    <div>
      <ChTable
        chars={chars}
        tableRef={tableRef}
        handleRowClick={handleRowClick}
      />
      <div className={styles.buttonBlock}>
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

        {loading && <div className={styles.loadingBlock}>Loading...</div>}
      </div>
    </div>
  );
};
