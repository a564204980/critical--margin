import { defineStore } from "pinia";

export const useAmbientStore = defineStore("ambient", {
  state: () => ({
    ambientList: [],
  }),
});
