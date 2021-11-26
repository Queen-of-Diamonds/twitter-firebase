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
      <form class="flex flex-col p-4 space-y-4">
        <input
          name="username"
          type="text"
          class="p-2 border-2 rounded-lg"
          placeholder="Email"
        />
        <span class="text-xs text-center text-red-500"></span>
        <input
          name="password"
          type="password"
          class="p-2 border-2 rounded-lg"
          placeholder="Password"
        />
        <span class="text-xs text-center text-red-500"></span>
        <div class="flex space-x-2">
          <button
            type="submit"
            class="w-1/2 py-2 text-white-200 bg-blue-600 rounded-lg"
          >
            Login
          </button>

          <button class="w-1/2 py-2 text-white-200 bg-blue-600 rounded-lg">
            Sign Up
          </button>
        </div>
        <button
          class="flex justify-center bg-white py-2 rounded-lg hover:bg-gray-300"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt=""
          />
        </button>
      </form>
    </div>
  </div>
</template>
