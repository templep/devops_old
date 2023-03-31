import sqlite3 from 'sqlite3';

export function creerCalendrier() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('calendrier.db');

    db.run('DROP TABLE IF EXISTS events');
    db.run(`CREATE TABLE IF NOT EXISTS events (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              date TEXT NOT NULL,
              heure_debut TEXT NOT NULL,
              heure_fin TEXT NOT NULL,
              evenement TEXT NOT NULL
            )`, (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log("Calendrier créé");
        resolve();
      }
    });

    db.close();
  });
}


export function ajouterEvenement(date, heureDebut, heureFin, evenement) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('calendrier.db');
    const sql =
      'INSERT INTO events (date, heure_debut, heure_fin, evenement) VALUES (?, ?, ?, ?)';
    db.run(sql, [date, heureDebut, heureFin, evenement], (err) => {
      db.close();
      if (err) {
        reject(err.message);
      } else {
        resolve('Evenement ajouté au calendrier');
      }
    });
  });
}

export function supprimerEvenement(id) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('calendrier.db');
    const sql = 'DELETE FROM events WHERE id = ? ';

    db.run(sql, [id], (err) => {
      db.close();
      if (err) {
        reject(err.message);
      } else {
        resolve('Evenement supprimé du calendrier');
      }
    });
  });
}

export function verifierEvenement(date, heure) {
  return new Promise((resolve, reject) => {
    let event = '';
    const db = new sqlite3.Database('calendrier.db');
    const sql = 'SELECT * FROM events WHERE date = ?';
    db.all(sql, [date], (err, rows) => {
      db.close();
      if (err) {
        reject(err.message);
      } else {
        const evenement = rows.find(
          (row) => row.heure_debut <= heure && heure < row.heure_fin
        );
        if (evenement) {
          event += `Evenement trouvé : ${evenement.evenement}`;
        } else {
          event += 'Aucun evenement à cette heure';
        }
        resolve(event);
      }
    });
  });
}

export async function afficherEvenements(dateDebut, dateFin) {
  // Ouvrir la base de données
  const db = new sqlite3.Database('calendrier.db');

  // Créer une promesse pour attendre la fin de la requête SQL
  return new Promise((resolve, reject) => {
    // Sélectionner tous les événements entre la date de début et la date de fin
    const sql = 'SELECT * FROM events WHERE date BETWEEN ? AND ?';
    db.all(sql, [dateDebut, dateFin], (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        // Créer une chaîne de caractères avec les événements
        let affiche = "";
        rows.forEach(row => {
          affiche += `${row.id}. ${row.date} ${row.heure_debut}-${row.heure_fin} : ${row.evenement}\n`;
        });
        // Retourner les événements
        resolve(affiche);
      }
    });
  });
}

