<script setup lang="ts"></script>

<template>
  <NuxtPage />
</template>

<style>
:root {
  --accent-color: #336699;
}
body {
  margin: 0;
}
dl,
dt,
dd {
  margin: 0;
}
input {
  padding-inline: 4px;
  accent-color: var(--accent-color);
  &:focus-visible {
    outline-color: var(--accent-color);
  }
}
textarea {
  padding: 2px 6px;
  &:focus-visible {
    outline-color: var(--accent-color);
  }
}
button,
input[type='submit'] {
  cursor: pointer;
}
</style>
