import React from 'react';
import styles from './Table.module.scss';
import Image from 'next/image';

interface TableButtonProps {
  tableButtonType: string;
  handleClick: () => void;
}

export const TableButton: React.FC<TableButtonProps> = ({
  tableButtonType,
  handleClick,
}) => {
  return (
    <div className={styles.buttonContainer}>
      <div className={styles.imgContainer} onClick={handleClick}>
        <Image
          width="18px"
          height="18px"
          src={
            tableButtonType === 'prev'
              ? '/static/arrow-icon-left.svg'
              : '/static/arrow-icon-right.svg'
          }
          alt={`${tableButtonType} button`}
        />
      </div>
    </div>
  );
};
