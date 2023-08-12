<template>
    <div class="user-welcome">
      Welcome, {{ userName }}!
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getFirestore, doc, getDoc } from 'firebase/firestore';
  import { auth } from '@/firebase';
  
  export default {
    name: 'UserWelcome',
    setup() {
      const userName = ref('');
  
      onMounted(async () => {
        if (auth.currentUser) {
          const db = getFirestore();
          const userDoc = doc(db, 'users', auth.currentUser.uid);
          const userSnapshot = await getDoc(userDoc);
  
          if (userSnapshot.exists()) {
            userName.value = userSnapshot.data().name;
          }
        }
      });
  
      return { userName };
    },
  };
  </script>
  
  <style scoped>
  .user-welcome {
    font-weight: bold;
    margin-top: 10px;
  }
  </style>
  