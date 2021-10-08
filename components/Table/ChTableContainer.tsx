import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import {
  selectPage,
  nextPage,
  prevPage,
  selectScrollY,
  setScrollY,
} from '../../state/optionsSlice';
import { getItems, selectChars, selectInfo } from '../../state/tableSlice';
import { ChTable } from './ChTable';
import styles from './Table.module.scss';
import { TableButton } from './TableButton';

interface ChTableProps {}

export const ChTableContainer: React.FC<ChTableProps> = ({}) => {
  const dispatch = useAppDispatch();
  const chars = useAppSelector(selectChars);
  const info = useAppSelector(selectInfo);
  const page = useAppSelector(selectPage);
  const loading = useAppSelector((state) => state.table.loading);
  const scrollY = useAppSelector(selectScrollY);

  const tableRef = useRef<HTMLTableElement>(null);
  const isFirstRender = useRef<boolean | null>(true);

  useEffect(() => {
    window.scrollTo(0, scrollY);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isFirstRender.current) handleScrollReset(tableRef);
    dispatch(getItems(page));
    isFirstRender.current = false;
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

  return (
    <div>
      <ChTable
        chars={chars}
        tableRef={tableRef}
        handleRowClick={handleRowClick}
      />
      <div className={styles.buttonBlock}>
        <TableButton handleClick={handlePrevClick} tableButtonType="prev" />
        <TableButton handleClick={handleNextClick} tableButtonType="next" />
        <div>
          {loading && <div className={styles.loadingBlock}>Loading...</div>}
        </div>
      </div>
    </div>
  );
};
