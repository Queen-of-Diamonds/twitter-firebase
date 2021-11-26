<script setup>
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  username: yup
    .string()
    .required()
    .email()
    .label("Email"),
  password: yup
    .string()
    .required()
    .min(8)
    .label("Password"),
});

useForm({
  validationSchema: schema,
});

const { value: username, errorMessage: emailError } = useField("username");
const { value: password, errorMessage: passwordError } = useField("password");

import useAuth from "../composable/useAuth";
import useError from "../composable/useError";

const { isAuthenticated, login, signup, googleLogin } = useAuth();

const router = useRouter();

const loggingIn = async () => {
  console.log(
    "🚀 ~ file: Logout.vue ~ line 35 ~ loggingIn ~ password.value",
    password.value
  );
  console.log(
    "🚀 ~ file: Logout.vue ~ line 35 ~ loggingIn ~ username.value",
    username.value
  );
  await login(username.value, password.value);

  if (isAuthenticated.value) {
    router.push("/");
  } else {
    setError("Invalid username or password");
    // start();
  }
};

const signingUp = async () => {
  await signup(username.value, password.value);
  goToHome();
};

const google = async () => {
  await googleLogin();
  goToHome();
};

const goToHome = () => {
  if (isAuthenticated.value) {
    router.push("/");
  } else {
    setError("Invalid username or password");
    // start();
  }
};

const { error, setError } = useError();

// const { ready, start } = useTimeout(3000, { controls: true });
</script>

<template>
  <div
    class="
      flex flex-col
      items-center
      justify-center
      space-y-12
      min-h-screen-nonav
    "
  >
    <div
      class="
        flex
        items-center
        justify-center
        overflow-hidden
        bg-gray-200
        rounded-lg
        shadow-2xl
      "
    >
      <img
        class="h-64"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/768px-Twitter-logo.svg.png"
        alt="Hello BG"
      />
      <form @submit.prevent="loggingIn" class="flex flex-col p-4 space-y-4">
        <input
          name="username"
          type="text"
          class="p-2 border-2 rounded-lg"
          placeholder="Email"
          v-model="username"
        />
        <span class="text-xs text-center text-red-500">{{ emailError }}</span>
        <input
          name="password"
          type="password"
          class="p-2 border-2 rounded-lg"
          placeholder="Password"
          v-model="password"
        />
        <span class="text-xs text-center text-red-500">{{
          passwordError
        }}</span>
        <div class="flex space-x-2">
          <button
            type="submit"
            @submit.prevent="loggingIn"
            class="w-1/2 py-2 text-white-200 bg-blue-600 rounded-lg"
          >
            Login
          </button>

          <button
            @click="signingUp"
            class="w-1/2 py-2 text-white-200 bg-blue-600 rounded-lg"
          >
            Sign Up
          </button>
        </div>
        <button
          @click="google"
          class="flex justify-center bg-white py-2 rounded-lg hover:bg-gray-300"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google"
          />
        </button>
      </form>
    </div>
    <div
      v-if="!ready && error"
      class="
        absolute
        w-1/3
        p-4
        text-center text-red-800
        bg-red-300
        rounded-lg
        bottom-2
        right-2
      "
    >
      {{ error }}
    </div>
  </div>
</template>
