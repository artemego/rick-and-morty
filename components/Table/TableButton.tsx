import React from 'react';
import styles from './Table.module.scss';
import Image from 'next/image';

interface TableButtonProps {
  tableButtonType: string;
  handleClick: () => void;
  disabled: boolean;
}

export const TableButton: React.FC<TableButtonProps> = ({
  tableButtonType,
  handleClick,
  disabled,
}) => {
  return (
    <button
      className={`${styles.buttonContainer} ${
        disabled && styles.buttonContainerDisabled
      }`}
      disabled={disabled}
    >
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
    </button>
  );
};
