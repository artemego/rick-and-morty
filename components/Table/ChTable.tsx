import Link from 'next/link';
import React, { RefObject } from 'react';
import { ICharacter } from '../../common/types';
import Image from 'next/image';
import styles from './Table.module.scss';

interface ChTableProps {
  chars: ICharacter[];
  tableRef?: RefObject<HTMLTableElement>;
}

export const ChTable: React.FC<ChTableProps> = ({ chars, tableRef }) => {
  return (
    <table className={styles.tableWrapper} cellSpacing="0" ref={tableRef}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Status</th>
          <th>Species</th>
          <th>Gender</th>
          <th>Episodes</th>
        </tr>
      </thead>

      <tbody>
        {chars.map((char) => (
          <Link href={'/characters/' + char.id} passHref key={char.id}>
            <tr>
              <td>{char.id}</td>
              <td className={styles.charName}>
                <div className="imgContainer">
                  <Image
                    width="40px"
                    height="40px"
                    src={char.image}
                    alt={`${char.name} avatar`}
                  />
                </div>
                {char.name}
              </td>
              <td className={styles.charStatus}>{char.status}</td>
              <td>{char.species}</td>
              <td>{char.gender}</td>
              <td>{char.episode.length}</td>
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
};
