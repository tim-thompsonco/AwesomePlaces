import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

const sqlStatement: string =
  'CREATE TABLE IF NOT EXISTS places \
		(id INTEGER PRIMARY KEY NOT NULL, \
		title TEXT NOT NULL, \
		imageUri TEXT NOT NULL, \
		address TEXT NOT NULL, \
		lat REAL NOT NULL, \
		lng REAL NOT NULL);';

export const init = () => {
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
