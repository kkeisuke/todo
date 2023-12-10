<template>
  <div class="deafult-layout">
    <slot />
  </div>
</template>

<style scoped>
.deafult-layout {
  margin: 0 auto;
  padding-block: 1rem;
  max-width: min(30rem, calc(100% - 2rem));
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
