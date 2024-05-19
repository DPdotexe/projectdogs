export default {
  serverMiddleware: [
    { path: '/api/cani', handler: '~/server/api/cani.get.js' }, // Gestisce le richieste GET per ottenere l'elenco dei cani
    { path: '/api/cani', handler: '~/server/api/cani.post.js' }, // Gestisce le richieste POST per aggiungere un nuovo cane
    { path: '/api/cani', handler: '~/server/api/cani.put.js' }, // Gestisce le richieste PUT per aggiornare i dettagli di un cane
    { path: '/api/cani', handler: '~/server/api/cani.delete.js' }, // Gestisce le richieste DELETE per eliminare un cane
  ],
}
