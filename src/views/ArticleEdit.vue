<template>
  <div v-if="article" class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul v-if="errorList" class="error-messages">
            <li v-for="v in errorList" :key="v">{{ v }}</li>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="tag" @keyup.enter="addTag" />
                <div class="tag-list"></div>
              </fieldset>
              <div class="tag-list">
                <span v-for="tag in article.tagList" class="tag-default tag-pill ng-binding ng-scope" :key="tag">
                  <i class="ion-close-round" @click="removeTag(tag)"></i>
                  {{ tag }}
                </span>
              </div>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="addArticle">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getErrorList } from '@/common/util';

export default {
  data() {
    return {
      article: { tagList: [] },
      tag: '',
      errors: null,
    };
  },
  mounted() {
    console.log('Editor : mounted() :', this.$route.params);

    if (this.$route.params?.slug) {
      this.$store
        .dispatch('getArticle', this.$route.params.slug)
        .then((data) => (this.article = data))
        .catch((data) => (this.errors = data));
    }
  },
  computed: {
    errorList() {
      console.log('Login : computed/errorList : ');
      return getErrorList(this.errors);
    },
  },
  methods: {
    addTag() {
      console.log('Editor : metods/addTag() :', this.article.tagList, this.tag);
      if (!this.article.tagList.includes(this.tag)) this.article.tagList.push(this.tag);
      this.tag = '';
    },
    removeTag(delTag) {
      console.log('Editor : metods/removeTag() :', delTag);
      this.article.tagList = this.article.tagList.filter((tag) => tag !== delTag);
    },
    addArticle() {
      console.log('Editor : metods/addArticle() :', this.article);

      this.$store
        .dispatch('addArticle', this.article)
        .then((data) => this.$router.push({ name: 'article', params: { slug: data.slug } }))
        .catch((data) => (this.errors = data));
    },
  },
};
</script>

<style></style>
