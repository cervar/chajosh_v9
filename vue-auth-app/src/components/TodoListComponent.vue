<template>
    <div class="todo-app">
      <h2>ChA JoSh?</h2>
      <form @submit.prevent="addTask">
        <input v-model="newTask" placeholder="Enter a new task" />
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
  
  <style lang="scss" scoped>
.favorite {
  color: rgb(228, 42, 88);
}

.todo {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 1rem;
  background-color: rgba(63, 158, 236, 0.342);
  margin-bottom: 0.5rem;
  gap: 1.5rem;

  & i {
    cursor: pointer;
  }

  & i:hover {
    transform: scale(1.2);
  }

  &__task {
    text-align: center;
  }

  &__icons {
    display: flex;
    gap: 0.5rem;
  }

  &__delete:hover {
    color: red;
  }

  .low {
    color: green;
  }

  .medium {
    color: orange;
  }

  .high {
    color: red;
  }
}

.additional-info {
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid black;
  padding-block: 0.5rem;
  margin-bottom: 0.5rem;
  span {
    color: #4529c2;
    font-weight: bold;
  }
}
</style>