import React, { RefObject } from 'react';
import { IEpisode } from '../../common/types';
import styles from './Table.module.scss';

interface EpTableProps {
  eps: IEpisode[] | IEpisode;
  tableRef?: RefObject<HTMLTableElement>;
}

export const EpTable: React.FC<EpTableProps> = ({ eps, tableRef }) => {
  return (
    <table className={styles.tableWrapper} cellSpacing="0" ref={tableRef}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Episode</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {Array.isArray(eps) ? (
          eps.map((ep) => (
            <tr key={ep.id}>
              <td>{ep.id}</td>
              <td>{ep.name}</td>
              <td>{ep.episode}</td>
              <td>{ep.air_date}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td>{eps.id}</td>
            <td>{eps.name}</td>
            <td>{eps.episode}</td>
            <td>{eps.air_date}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
