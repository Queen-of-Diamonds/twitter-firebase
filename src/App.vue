<template>
  <div class="flex flex-col min-h-screen">
    <header class="flex items-center border-b border-gray-600">
      <router-link to="/profile" class="p-4 mr-3 text-green-500 text-2xl">
        <i class="fas fa-user"></i>
      </router-link>

      <h1 class="text-white font-black text-xl">{{ $route.name }}</h1>
      <div class="flex-grow"></div>
      <button
        @click="logout"
        class="inline-flex items-center px-6 py-3 ml-6 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Logout
      </button>
    </header>

    <main class="flex-1 overflow-scroll">
      <router-view />
    </main>

    <footer class="grid grid-cols-5 border-t border-gray-600">
      <router-link
        v-for="(route, i) in routes"
        :key="i"
        :to="route.path"
        :class="
          `p-4 text-center text-2xl ${
            route.name == $route.name ? 'text-green-500' : 'text-gray-300'
          }`
        "
      >
        <i :class="route.iconClass"></i>
      </router-link>
    </footer>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
// @Christie: try to use this "@/" approach always.
// one benefit: if you move a file, at least its imports continue working.
import useAuth from "@/composable/useAuth";

export default {
  setup() {
    const routes = ref([]);
    const router = useRouter();
    const { logout } = useAuth()
    onBeforeMount(() => {
      routes.value = router.options.routes.filter((r) => r.mainMenu);
    });
    return {
      routes,
      logout
    };
  },
};
</script>
