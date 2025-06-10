// src/boot/lottie.js
import { boot } from 'quasar/wrappers';
import LottieAnimation from 'vue3-lottie'

export default boot(({ app }) => {
  app.use(LottieAnimation);
});
