<script setup>
import { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from '~/src/graphql/mutations'
import { onCreateTodo, test } from '~/src/graphql/subscriptions'

const input = ref('')
const reply = ref('')
const total_comments = ref(0)
const comments = ref([])

function getReplySingleton(reply) {
  return function () {
    return {
      reply,
    }
  }
}
function getSingleTon(comment) {
  return function () {
    return {
      comment,
      total_likes: 0,
      replies: [],
    }
  }
}
async function submit() {
  var comment = getSingleTon(input.value)
  var newc = [...comments.value, comment()]
  comments.value = newc
  input.value = ''
  total_comments.value = comments.value.length

  const todoDetails = {
    name: 'Todo 1',
    description: 'Learn AWS AppSync',
    userID: 'aaa',
  }

  const newTodo = await API.graphql({
    query: createTodo,
    variables: { input: todoDetails },
  })
  console.log('🚀 ~ submit ~ newTodo', newTodo)
}

API.graphql(
  graphqlOperation(test, {
    userID: 'aaa',
  })
).subscribe({
  next: ({ provider, value }) => console.log({ provider, value }),
  error: (error) => console.warn(error),
})

// API.graphql(graphqlOperation(onCreateTodo)).subscribe({
//   next: ({ provider, value }) => console.log({ provider, value }),
//   error: (error) => console.warn(error),
// })

function like(index) {
  comments.value[index].total_likes = comments.value[index].total_likes + 1
}

function addReply(index) {
  const s = getReplySingleton(reply.value)
  const replies = comments.value[index].replies
  const n = [...replies, s()]
  comments.value[index].replies = n
  reply.value = ''
}
</script>

<template>
  <div id="comment_app" class="container">
    <div class="navbar navbar-default">
      <div class="navbar-header">
        <a class="navbar-brand">Comments App</a>
      </div>
      <div class="navbar-collapse collapse">
        <ul class="navbar-right navbar-nav nav">
          <li>
            <a href="#">{{ total_comments }} Comments</a>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div class="row">
        <!-- form -->
        <form class="col-sm-4 col-sm-offset-4" v-on:submit.prevent="submit">
          <h3>Create Comments</h3>
          <div class="form-group">
            <textarea
              placeholder="Your comment"
              v-model="input"
              class="form-control"
            ></textarea>
          </div>
          <button class="btn btn-info">Create</button>
          <br />
          <br />
          <legend></legend>
        </form>
        <!-- form -->
        <div class="cols-m-12">
          <div class="col-sm-4 col-sm-offset-4">
            <div v-if="total_comments === 0">
              <div class="alert alert-info">No Comments</div>
            </div>
            <div class="list-group">
              <div
                class="list-group-item"
                v-for="(comment, index) in comments"
                :key="index"
              >
                <p><strong>Comment: </strong> {{ comment.comment }}</p>
                <p>
                  <strong>Total Likes:</strong>
                  {{ comment.total_likes }}
                </p>
                <p>
                  <button v-on:click="like(index)" class="btn btn-xs btn-info">
                    Like
                  </button>
                </p>
                <h5>Replies</h5>
                <div class="list-group">
                  <div
                    class="list-group-item"
                    v-for="(reply, index) in comment.replies"
                    :key="index"
                  >
                    <p><strong>reply:</strong> {{ reply.reply }}</p>
                  </div>
                  <div class="list-group-item" style="padding: 00">
                    <form v-on:submit.prevent="addReply(index)">
                      <input
                        v-model="reply"
                        placeholder="reply"
                        class="form-control"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
