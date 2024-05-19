import mysql from 'mysql2';

// database config

export default defineEventHandler(async (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '27006',
    database: 'prova',
  });

  try {
    await connection.connect();

    // Operazione di eliminazione: Elimina un cane
    const { id } = req.body;
    await connection.promise().query('DELETE FROM cani WHERE id = ?', [id]);
    await connection.end();
    res.status(200).json({ message: 'Cane eliminato con successo' });
  } catch (error) {
    console.error('Errore durante l\'eliminazione di un cane:', error);
    await connection.end();
    res.status(500).json({ error: 'Si è verificato un errore durante l\'eliminazione di un cane' });
  }
});
