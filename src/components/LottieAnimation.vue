<template>
  <div
    ref="lottieContainer"
    style="width: 130px; height: 130px; margin-left: -20px; margin-top: -25px"
  ></div>
</template>

<script>
import lottie from 'lottie-web'

export default {
  name: 'LottieAnimation',
  props: {
    animationData: {
      type: Object,
      required: true,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.animation = lottie.loadAnimation({
      container: this.$refs.lottieContainer,
      renderer: 'svg',
      loop: this.loop,
      autoplay: this.autoplay,
      animationData: this.animationData,
    })
  },
  beforeUnmount() {
    if (this.animation) {
      this.animation.destroy()
    }
  },
}
</script>
