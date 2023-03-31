import sqlite3 from "sqlite3";


export function newMember(discord_id, fullname) {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database('members.db', (err) => {
      if (err) reject(err);

      db.run('CREATE TABLE IF NOT EXISTS members (discord_id TEXT, fullname TEXT)', (err) => {
        if (err) reject(err);

        db.get('SELECT * FROM members WHERE discord_id = ?', [discord_id], (err, row) => {
          if (err) reject(err);

          if (row) {
            console.log('Le discord_id est déjà présent dans la base de données');
            resolve();
          } else {
            db.run('INSERT INTO members (discord_id,fullname) VALUES (?, ?)', [discord_id, fullname], (err) => {
              if (err) reject(err);
              resolve();
            });
          }
        });
      });
    });
  });
}

export async function deleteMembers(discord_id) {
  let db = new sqlite3.Database('members.db', (err) => {
    if (err) throw err;

    db.run('DELETE FROM members WHERE discord_id = ?', [discord_id], (err) => {
      if (err) throw err;
    });
  });
}

export function getFullName(discord_id) {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database('members.db', (err) => {
      if (err) reject(err);

      db.get('SELECT fullname FROM members WHERE discord_id = ?', [discord_id], (err, row) => {
        if (err) reject(err);

        if (row) {
          resolve(row.fullname);
        } else {
          resolve("");
        }
      });
    });
  });
}
