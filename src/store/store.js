import Vue from "vue";

export let store = Vue.observable(
  {
    breadcrumbs: [],
  });

export let mutations = {
  setBreadcrumbs(breadcrumbs) {
    store.breadcrumbs = breadcrumbs;
  },
};
