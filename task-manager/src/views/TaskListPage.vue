<template>
  <div class="container">
    <h2>Лист задач</h2>
    <div class="add">
      <input class="add__task" type="text" v-model="newTask.title" placeholder="Добавить новую задачу" />
      <input class="add__task__date" type="date" v-model="newTask.dueDate" />
      <button @click="addTask">Добавить</button>
    </div>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <div class="task" v-if="task.editing">
          <input type="text" v-model="task.title" />
          <input type="date" v-model="task.dueDate"/>
          <button @click="saveTask(task)">Сохранить</button>
        </div>
        <div class="task" v-else>
          <div class="task-item">
            {{ task.title }}
          <span v-if="task.dueDate">Срок выполнения: {{ task.dueDate }}</span>
          </div>
          <div class="completed__container">
              <span class="completed" v-if="task.completed">Выполнено</span>
            <div class="buttons">
              <button @click="editTask(task)">Изменить</button>
              <button @click="deleteTask(index)">Удалить</button>
              <button v-if="!task.completed" @click="markAsCompleted(task)">Пометить как выполнено</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: 'TaskListPage',
  data() {
    return {
      newTask: {
        title: '',
        dueDate: '',
      },
    };
  },
  computed: {
    ...mapGetters(['getTasks']),
    tasks() {
      return this.getTasks;
    },
  },
  methods: {
    ...mapActions(['createTask', 'editTask', 'removeTask']),
    addTask() {
      if (this.newTask.title.trim() !== '') {
        this.createTask({ ...this.newTask, editing: false, completed: false });
        this.newTask = { title: '', dueDate: '' };
        this.saveTasksToLocalStorage();
      }
    },
    editTask(task) {
      task.editing = true;
    },
    saveTask(task) {
      if (task.title.trim() !== '') {
        task.editing = false;
        this.editTask({ index: task.index, task: { ...task } });
        this.saveTasksToLocalStorage();
      }
    },
    deleteTask(index) {
      this.removeTask(index);
      this.saveTasksToLocalStorage();
    },
    markAsCompleted(task) {
      task.completed = true; // Отмечаем задачу как выполненную
      this.saveTasksToLocalStorage();
    },

    // Добавляем функцию для автоматической отправки оповещений
    sendAutomaticNotifications() {
      const now = new Date();
      this.tasks.forEach((task) => {
        if (!task.completed) {
          const dueDate = new Date(task.dueDate);
          const timeDiff = dueDate.getTime() - now.getTime();
          const hoursDiff = Math.ceil(timeDiff / (1000 * 3600));
                  console.log('timeDiff:', timeDiff);
                  console.log('hoursDiff:', hoursDiff);

        if (hoursDiff <= 13 && hoursDiff >= 0) {
          // Проверяем, близок ли срок выполнения задачи
          // Отправляем уведомление на электронную почту
          const emailSubject = 'Напоминание: Приближается срок выполнения задачи';
          const emailText = `Задача "${task.title}" должна быть выполнена в ближайшие ${hoursDiff - 3} часов.`;

          // Создаем объект с данными для отправки на сервер
          const emailData = {
            to: 'kvemil@rambler.ru',
            subject: emailSubject,
            text: emailText,
          };
            
            axios.post('http://localhost:3000/send-email', emailData)
              .then((response) => {
                if (response.data.success) {
                  alert('Письмо успешно отправлено!');
                } else {
                  alert('Произошла ошибка при отправке письма.');
                }
              })
              .catch((error) => {
                console.error(error);
                alert('Произошла ошибка при отправке запроса на сервер.');
              });
            
            task.completed = true; // Отмечаем задачу как выполненную
            this.saveTasksToLocalStorage();
          }
        }
      });
    },
    saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    loadTasksFromLocalStorage() {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
        this.$store.commit('setTasks', JSON.parse(tasks));
      }
    },
  },
  mounted() {
    this.loadTasksFromLocalStorage();
    
    // Запускаем проверку каждую минуту
    setInterval(this.sendAutomaticNotifications, 60000);
  },
};
</script>
