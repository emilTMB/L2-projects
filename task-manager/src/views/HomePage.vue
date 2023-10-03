<template>
  <div class="main">
    <h1>Добро пожаловать в менеджер задач!</h1>
    <router-link to="/tasks">
      <button class="next">Перейти к задачам!</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>