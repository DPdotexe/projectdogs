import mysql from 'mysql2';

export default defineEventHandler(async (req, res) => {
  try {
    // Connessione al database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '27006',
      database: 'prova',
    });

    // Verifica se req.body è definito e contiene i dati necessari
    if (!req.body || !req.body.nome || !req.body.razza || !req.body.padrone) {
      throw new Error('Dati del cane non presenti nel corpo della richiesta');
    }

    // Estrazione dei dati dal corpo della richiesta
    const { nome, razza, padrone } = req.body;

    // Esecuzione della query SQL per l'inserimento del cane
    await connection.execute('INSERT INTO cani (nome, razza, padrone) VALUES (?, ?, ?)', [nome, razza, padrone]);

    // Chiusura della connessione al database
    await connection.end();

    // Risposta al client con uno stato di successo
    res.status(201).json({ message: 'Cane aggiunto con successo' });
  } catch (error) {
    // Gestione degli errori
    console.error('Errore durante l\'aggiunta di un cane:', error);
    res.status(500).json({ error: 'Si è verificato un errore durante l\'aggiunta di un cane' });
  }
});
