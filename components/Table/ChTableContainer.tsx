import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { selectPage, nextPage, prevPage } from '../../state/optionsSlice';
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

  const tableRef = useRef<HTMLTableElement>(null);

  // get items with state from redux
  // useEffect(() => {
  //   dispatch(getItems(page));
  // }, [dispatch, page]);

  useEffect(() => {
    console.log('works');
    handleScrollReset(tableRef);
    dispatch(getItems(page));
  }, [dispatch, page]);

  const handleScrollReset = (
    tableRef: React.RefObject<HTMLTableElement>
  ): void => {
    tableRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNextClick = () => {
    return page < info.pages && dispatch(nextPage());
  };
  const handlePrevClick = () => {
    return page > 1 && dispatch(prevPage());
  };

  return (
    <div>
      <ChTable chars={chars} tableRef={tableRef} />
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
