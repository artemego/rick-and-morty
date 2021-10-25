import Link from "next/link";
import React, { RefObject } from "react";
import { ICharacter, Status, Gender } from "../../common/types";
import Image from "next/image";
import styles from "./Table.module.scss";

const statusClassnames = {
  [Status.Alive]: "statusGreen",
  [Status.Dead]: "statusRed",
  [Status.Unknown]: "statusYellow",
};
const genderClassnames = {
  [Gender.Male]: "statusBlue",
  [Gender.Female]: "statusPink",
  [Status.Unknown]: "statusYellow",
};

interface ChTableProps {
  chars: ICharacter[];
  tableRef?: RefObject<HTMLTableElement>;
  handleRowClick: () => void;
}

export const ChTable: React.FC<ChTableProps> = ({
  chars,
  tableRef,
  handleRowClick,
}) => {
  return (
    <table className={styles.tableWrapper} cellSpacing="0" ref={tableRef}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Status</th>
          <th>Species</th>
          <th>Gender</th>
          <th>Eps</th>
        </tr>
      </thead>

      <tbody>
        {chars.map((char) => (
          <Link href={"/characters/" + char.id} passHref key={char.id}>
            <tr onClick={handleRowClick}>
              <td>{char.id}</td>
              <td className={styles.charName}>
                <div className={styles.imgBlock}>
                  <div className="imgContainer">
                    <Image
                      width="60px"
                      height="60px"
                      src={char.image}
                      alt={`${char.name} avatar`}
                    />
                  </div>
                </div>

                <p>{char.name}</p>
              </td>
              <td>
                <p
                  className={`${styles.status} ${
                    styles[statusClassnames[char.status]]
                  }`}
                >
                  {char.status}
                </p>
              </td>
              <td>{char.species}</td>
              <td>
                <p
                  className={`${styles.status} ${
                    styles[genderClassnames[char.gender]]
                  }`}
                >
                  {char.gender}
                </p>
              </td>
              <td>{char.episode.length}</td>
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
};

export const ChTableMemo = React.memo(ChTable);
