<template>
  <div class="container">
    <h1>Benvenuto!</h1>
    <p>Questo è il mio progetto sui cani.</p>
    <router-link to="/cani">
      <button class="view-dogs-button">Visualizza Cani</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Index',
};
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}

.view-dogs-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.view-dogs-button:hover {
  background-color: #45a049;
}
</style>
