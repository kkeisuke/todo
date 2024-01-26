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
  font-family: sans-serif;
}
dl,
dt,
dd {
  margin: 0;
}
input,
textarea,
button {
  accent-color: var(--accent-color);
}
input {
  padding: 2px 4px;
  font-size: 1rem;
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
