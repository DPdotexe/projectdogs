import mysql from 'mysql2';

export default defineEventHandler(async (req, res) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '27006',
    database: 'prova',
  });

  try {
    await connection.connect();

    // Operazione di aggiornamento: Modifica i dettagli di un cane
    const { id, nome, razza, padrone } = req.body;
    await connection.promise().query('UPDATE cani SET nome = ?, razza = ?, padrone = ? WHERE id = ?', [nome, razza, padrone, id]);
    await connection.end();
    res.status(200).json({ message: 'Dettagli del cane aggiornati con successo' });
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dei dettagli di un cane:', error);
    await connection.end();
    res.status(500).json({ error: 'Si è verificato un errore durante l\'aggiornamento dei dettagli di un cane' });
  }
});
