<template>
  <div class="text-input">
    <label v-if="label" :for="id" class="text-input__label">{{ label }}</label>
    <input
      :id="id"
      type="text"
      v-model="modelValueLocal"
      :placeholder="placeholder"
      class="text-input__input"
      @input="$emit('update:modelValue', modelValueLocal)"
    />
  </div>
  <div v-if="error" class="text-input__error">
    {{ errorMessage }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: () => `text-input-${Math.random().toString(36).substr(2, 9)}`,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: 'This field is required',
  },
})

const modelValueLocal = ref('')
</script>

<style scoped>
.text-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.text-input__label {
  margin-bottom: 0.25rem;
  font-weight: 600;
}
.text-input__input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.text-input__input:focus {
  border-color: #007bff;
  outline: none;
}
</style>
