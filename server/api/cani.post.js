import mysql from 'mysql2';

export default defineEventHandler(async (req, res) => {
  try {
    // Configurazione del database
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '27006',
      database: 'prova',
    });

    // Connessione al database
    connection.connect();

    // Estrazione dei dati dal corpo della richiesta
    const { nome, razza, padrone } = req.body;

    // Verifica se i dati necessari sono presenti nel corpo della richiesta
    if (!nome || !razza || !padrone) {
      return res.status(400).json({ error: 'Assicurati di fornire nome, razza e padrone del cane' });
    }

    // Esecuzione della query SQL per l'inserimento del cane nel database
    const query = 'INSERT INTO cani (nome, razza, padrone) VALUES (?, ?, ?)';
    connection.query(query, [nome, razza, padrone], (error, results, fields) => {
      if (error) {
        console.error('Errore durante l\'inserimento del cane:', error);
        return res.status(500).json({ error: 'Si è verificato un errore durante l\'inserimento del cane' });
      }
      
      // Risposta al client con uno stato di successo
      return res.status(201).json({ message: 'Cane aggiunto con successo', id: results.insertId });
    });

    // Chiusura della connessione al database
    connection.end();
  } catch (error) {
    console.error('Errore durante l\'aggiunta di un cane:', error);
    res.status(500).json({ error: 'Si è verificato un errore imprevisto durante l\'aggiunta di un cane' });
  }
});
