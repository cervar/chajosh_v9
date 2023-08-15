<template>
    <div class="todo-app">
      <h2>ChA JoSh?</h2>
      <form @submit.prevent="addTask">
        <input v-model="newTask" placeholder="Koji je novi zadatak?" />
        <button type="submit"><i class="fas fa-plus"></i> Dodaj</button>
      </form>
      <button @click="sortTasks"><i class="fas fa-sort"></i> Sortiraj</button>
      <div>Ukupno Obaveza: {{ tasks.length }}</div>
      <div>Završeno: {{ completedTasks }}</div>
      <ul>
        <li v-for="task in filteredTasks" :key="task.id" :class="{ 'completed-task': task.completed }">
          <input type="checkbox" v-model="task.completed" />
          {{ task.text }}
          <button @click="updateTask(task)"><i class="fas fa-edit"></i> Uredi</button>
          <button @click="deleteTask(task.id)"><i class="fas fa-trash"></i> Obriši</button>
        </li>
      </ul>
    </div>
  </template>
  <script>
  import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
  import { auth } from '@/firebase';
  
  export default {
    data() {
      return {
        newTask: '',
        tasks: [],
        sortBy: 'text',
        sortOrder: 'asc'
      };
    },
    computed: {
      completedTasks() {
        return this.tasks.filter(task => task.completed).length;
      },
      filteredTasks() {
        const sortedTasks = this.tasks.slice().sort((a, b) => {
          const compareResult = a[this.sortBy].localeCompare(b[this.sortBy]);
          return this.sortOrder === 'asc' ? compareResult : -compareResult;
        });
  
        return sortedTasks;
      }
    },
    methods: {
      async addTask() {
        if (this.newTask.trim() === '') return;
  
        const db = getFirestore();
        const taskRef = collection(db, 'tasks');
  
        await addDoc(taskRef, {
          text: this.newTask,
          userId: auth.currentUser.uid,
          completed: false
        });
  
        this.newTask = '';
        this.fetchTasks();
      },
      async fetchTasks() {
        const db = getFirestore();
        const taskRef = collection(db, 'tasks');
        const snapshot = await getDocs(taskRef);
  
        this.tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      },
      async updateTask(task) {
        const db = getFirestore();
        const taskDoc = doc(db, 'tasks', task.id);
  
        await updateDoc(taskDoc, {
          text: task.text,
          completed: task.completed
        });
  
        this.fetchTasks();
      },
      async deleteTask(taskId) {
        const db = getFirestore();
        const taskDoc = doc(db, 'tasks', taskId);
  
        await deleteDoc(taskDoc);
        this.fetchTasks();
      },
      sortTasks() {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      }
    },
    mounted() {
      this.fetchTasks();
    }
  };
  </script>
  
  <style scoped>
.todo-app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

form {
  margin-bottom: 10px;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.completed-task {
  text-decoration: line-through;
  color: gray;
}

.fa {
  margin-right: 5px;
}
</style>