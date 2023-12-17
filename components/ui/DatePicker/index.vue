<script setup lang="ts">
defineOptions({
  name: 'UiDatePicker',
  inheritAttrs: false
})
defineProps<{
  type: 'date' | 'datetime-local'
  modelValue?: string
}>()
defineEmits<{
  'update:modelValue': [value: string]
  // 使用する側で $event に型をつけるため
  change: [value: Event]
}>()

const datePicker = ref<HTMLInputElement>()

const handleClick = () => {
  datePicker.value?.showPicker()
}
</script>

<template>
  <input
    ref="datePicker"
    class="ui-date-picker"
    :type="type"
    :value="modelValue"
    v-bind="$attrs"
    @click="handleClick"
    @input="$emit('update:modelValue', datePicker?.value || '')"
    @change="$emit('change', $event)"
  />
</template>

<style scoped></style>
