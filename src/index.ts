import { createApp, h } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle, signOutUser } from "./firebase";
import "./assets/styles.css";

const app = createApp({
  data() {
    return {
      user: null,
    };
  },
  created() {
    onAuthStateChanged(getAuth(), (user) => {
      this.user = user;
    });
  },
  methods: {
    async login() {
      await signInWithGoogle();
    },
    async logout() {
      await signOutUser();
    },
  },
  render() {
    if (this.user) {
      return h("div", { class: "flex justify-end items-center p-4" }, [
        h("img", {
          class: "rounded-full w-8 h-8 mr-2",
          src: this.user.photoURL,
        }),
        h(
          "button",
          { class: "btn btn-primary", onClick: this.logout },
          "Sign Out"
        ),
      ]);
    } else {
      return h("div", { class: "flex justify-center items-center h-screen" }, [
        h(
          "button",
          { class: "btn btn-primary", onClick: this.login },
          "Log in with Google"
        ),
      ]);
    }
  },
});

app.mount("#app");
