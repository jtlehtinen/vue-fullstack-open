<script setup>
const props = defineProps({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
})

const emit = defineEmits([
  'update:title',
  'update:author',
  'update:url',
  'submit'
])

function updateTitle(event) {
  emit('update:title', event.target.value)
}

function updateAuthor(event) {
  emit('update:author', event.target.value)
}

function updateUrl(event) {
  emit('update:url', event.target.value)
}

async function handleSubmit() {
  const titleValue = props.title.trim()
  const authorValue = props.author.trim()
  const urlValue = props.url.trim()

  emit('submit', titleValue, authorValue, urlValue)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Title:
        <input
          type="text"
          :value="title"
          @input="updateTitle"
        />
      </label>
    </div>
    <div>
      <label>Author:
        <input
          type="text"
          :value="author"
          @input="updateAuthor"
        />
      </label>
    </div>
    <div>
      <label>URL:
        <input
          type="url"
          :value="url"
          @input="updateUrl"
        />
      </label>
    </div>
    <button type="submit">Create</button>
  </form>
</template>
