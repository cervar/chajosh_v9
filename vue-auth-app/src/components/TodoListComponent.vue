<template>
    <div>
      <h2>ChA JoSh?</h2>
      <form @submit.prevent="addTask">
        <input v-model="newTask" placeholder="Enter a new task" />
        <button type="submit">Add</button>
      </form>
      <button @click="sortTasks">Sortiraj obaveze</button>
      <div>Ukupno obaveza: {{ tasks.length }}</div>
      <div>Završeno: {{ completedTasks }}</div>
      <ul>
        <li v-for="task in filteredTasks" :key="task.id" :class="{ 'completed-task': task.completed }">
          <input type="checkbox" v-model="task.completed" />
          {{ task.text }}
          <button @click="updateTask(task)">Izmjeni</button>
          <button @click="deleteTask(task.id)">Obriši</button>
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
  .completed-task {
    text-decoration: line-through;
    color: gray;
  }
  </style>
  