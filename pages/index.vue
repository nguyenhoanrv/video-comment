<script setup></script>

<template>
  <div>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user.username }}!</h1>
        <button @click="signOut">Sign Out</button>

        <comment />
      </template>
    </authenticator>
  </div>
</template>
