import sqlite3 from 'sqlite3';

export function createDB() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('todo.db', err => {
      if (err) reject(err);
      else {
        db.run('DROP TABLE IF EXISTS ToDoList');
        db.run('CREATE TABLE IF NOT EXISTS ToDoList(tache TEXT PRIMARY KEY, status TEXT DEFAULT "A faire", date TEXT, realisateur TEXT)', err => {
          if (err) reject(err);
          else resolve("La base de données a été créée avec succès");
        });
      }
    });
    db.close();
  });
}

export function addTask(task) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('todo.db', err => {
      if (err) reject(err);
      else {
        db.run('INSERT INTO ToDoList(tache) VALUES(?)', [task], err => {
          if (err) reject(err);
          else resolve("La tâche a été ajoutée avec succès");
        });
      }
    });
    db.close();
  });
}

//fonction get task qui met dans une string toutes les taches de la base de données et les renvoie à la fonction appelante
export async function getTasks() {
  let tasks = "";
  let db = new sqlite3.Database('todo.db');

  try {
    const rows = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM ToDoList', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    rows.forEach(row => {
      if (row.date === null) {
        tasks += row.tache + ", " + row.status + " \n";
      } else {
        tasks += row.tache + ", " + row.status + " le " + row.date + " par " + row.realisateur + "\n";
      }
    });

    if (tasks === "") {
      tasks = "Pas de tâche";
    }

  } catch (err) {
    console.error(err);
  } finally {
    db.close();
  }

  return tasks;
}


//si une tache est terminée, mettre le status à "Terminée" et la date à la date du jour et le realisateur à l'utilisateur qui a terminé la tache

export function finishTask(task, date, realisateur) {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database("todo.db", (err) => {
      if (err) {
        reject(err);
      }
      db.run(
        "UPDATE ToDoList SET status = 'Terminée', date = ?, realisateur = ? WHERE tache = ?",
        [date, realisateur, task],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
    db.close();
  });
}

export function deleteTask(task) {
  console.log("delete task");
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database("todo.db", (err) => {
      if (err) {
        reject(err);
      }
      db.run("DELETE FROM ToDoList WHERE tache = ?", [task], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    db.close();
  });
}




