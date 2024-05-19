<template>
  <div class="container">
    <h1>Elenco dei Cani</h1>
    <button class="add-dog-button" @click="mostraModuloAggiunta = true">Aggiungi Cane</button>

    <!-- Modale per aggiungere cane -->
    <div class="modal" v-if="mostraModuloAggiunta">
      <h2>Aggiungi Cane</h2>
      <form @submit.prevent="aggiungiCane" class="add-dog-form">
        <input v-model="datiCane.razza" placeholder="Razza del cane" required />
        <input v-model="datiCane.nome" placeholder="Nome del cane" required />
        <input v-model="datiCane.padrone" placeholder="Padrone del cane" required />
        <div class="button-container">
          <button type="submit" class="submit-button">Aggiungi Cane</button>
          <button @click="annullaAggiunta" type="button" class="cancel-button">Annulla</button>
        </div>
        <p v-if="erroreAggiunta" class="error-message">{{ erroreAggiunta }}</p>
      </form>
    </div>

    <!-- Tabella per visualizzare i cani aggiunti -->
    <table v-if="cani.length">
      <thead>
        <tr>
          <th>Razza</th>
          <th>Nome</th>
          <th>Padrone</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cane, index) in cani" :key="index">
          <td>{{ cane.razza }}</td>
          <td>{{ cane.nome }}</td>
          <td>{{ cane.padrone }}</td>
          <td>
            <button @click="modificaCane(cane)">Modifica</button>
            <button @click="eliminaCane(cane.id)">Elimina</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pulsante per tornare alla pagina principale -->
    <button class="back-button" @click="vaiAllaPaginaPrincipale">Torna Indietro</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const mostraModuloAggiunta = ref(false);
    const datiCane = ref({ razza: '', nome: '', padrone: '' });
    const cani = ref([]);
    const erroreAggiunta = ref('');

    const recuperaCani = async () => {
      try {
        const response = await axios.get('/api/cani');
        cani.value = response.data;
      } catch (error) {
        console.error('Errore durante il recupero dei cani', error);
      }
    };

    const aggiungiCane = async () => {
      try {
        if (!datiCane.value.nome || !datiCane.value.razza || !datiCane.value.padrone) {
          erroreAggiunta.value = 'Per favore compila tutti i campi';
          return;
        }
        
        const response = await axios.post('/api/cani', datiCane.value);
        cani.value.push(response.data);
        annullaAggiunta();
      } catch (error) {
        console.error('Errore durante l\'aggiunta del cane', error);
        if (error.response && error.response.status === 500) {
          erroreAggiunta.value = 'Si è verificato un errore durante l\'aggiunta del cane';
        } else {
          erroreAggiunta.value = 'Si è verificato un errore imprevisto';
        }
      }
    };

    const eliminaCane = async (idCane) => {
      try {
        await axios.delete(`/api/cani/${idCane}`);
        cani.value = cani.value.filter(cane => cane.id !== idCane);
      } catch (error) {
        console.error('Errore durante l\'eliminazione del cane', error);
      }
    };

    const modificaCane = (cane) => {
      // Implementa la logica per la modifica del cane
    };

    const annullaAggiunta = () => {
      datiCane.value = { razza: '', nome: '', padrone: '' };
      mostraModuloAggiunta.value = false;
      erroreAggiunta.value = ''; 
    };

    const vaiAllaPaginaPrincipale = () => {
      router.push('/');
    };

    onMounted(recuperaCani);

    return {
      mostraModuloAggiunta,
      datiCane,
      cani,
      aggiungiCane,
      eliminaCane,
      modificaCane,
      annullaAggiunta,
      vaiAllaPaginaPrincipale,
      erroreAggiunta
    };
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}

.add-dog-button {
  margin-bottom: 20px;
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
}

.add-dog-form {
  width: 100%;
}

.button-container {
  margin-top: 20px;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th { 
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
