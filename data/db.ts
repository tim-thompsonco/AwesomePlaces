import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
  const sqlStatement: string =
    'CREATE TABLE IF NOT EXISTS places \
		(id INTEGER PRIMARY KEY NOT NULL, \
		title TEXT NOT NULL, \
		imageUri TEXT NOT NULL, \
		address TEXT NOT NULL, \
		lat REAL NOT NULL, \
		lng REAL NOT NULL);';

  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        sqlStatement,
        [],
        () => {
          resolve();
        },
        (_: any, err: any) => {
          reject(err);
        }
      );
    });
  });
};

export const insertPlace = (
  title: string,
  imageUri: string,
  address: string,
  lat: number,
  lng: number
) => {
  return new Promise((resolve, reject) => {
    const sqlStatement: string =
      'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);';

    db.transaction((tx: any) => {
      tx.executeSql(
        sqlStatement,
        [title, imageUri, address, lat, lng],
        (_: any, result: any) => {
          resolve(result);
        },
        (_: any, err: any) => {
          reject(err);
        }
      );
    });
  });
};
