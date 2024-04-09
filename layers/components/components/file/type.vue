<script lang="ts" setup>
defineProps({
  doc: {
    type: Object,
    default: () => {
      return {}
    },
  },
  classes: { type: String, default: 'h-48 w-48' },
  hideControls: { type: Boolean, default: false },
})
</script>

<template>
  <div>
    <div v-if="doc.type">
      <img
        v-if="doc.type === 'application/pdf'"
        src="@/assets/file-icons/pdf.png"
        :alt="doc.name"
        :class="classes"
      />
      <div v-else-if="doc.type.includes('image')" :class="classes">
        <img :src="doc.src" :alt="doc.name" :class="classes" />
      </div>
      <!-- 
    <div v-else-if="doc.type === 'image/jpg'" :class="classes">
      <img :src="doc.src" :alt="doc.name" :class="classes">
    </div>
    <div v-else-if="doc.type === 'image/jpeg'" :class="classes">
      <img :src="doc.src" :alt="doc.name" :class="classes">
    </div> -->

      <img
        v-else-if="
          doc.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        "
        src="@/assets/file-icons/doc.png"
        :alt="doc.name"
        :class="classes"
      />

      <img
        v-else-if="
          doc.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        "
        src="@/assets/file-icons/xls.png"
        :alt="doc.name"
        :class="classes"
      />

      <img
        v-else-if="doc.type === 'text/csv'"
        src="@/assets/file-icons/xls.png"
        :alt="doc.name"
        :class="classes"
      />

      <iframe
        v-else-if="doc.type === 'youtube'"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/_4kHxtiuML0"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />

      <video
        v-else-if="doc.type.includes('video')"
        :class="classes"
        :controls="!hideControls"
      >
        <source :src="doc.src" type="video/webm" />

        <source :src="doc.src" type="video/mp4" />

        Sorry, your browser doesn't support embedded videos.
      </video>
      <!-- <video v-else-if="doc.type === 'video/mp4'" :class="classes" :controls="!hideControls">
      <source :src="doc.src" type="video/webm">

      <source :src="doc.src" type="video/mp4">

      Sorry, your browser doesn't support embedded videos.
    </video> -->

      <audio v-else-if="doc.type === 'audio/x-m4a'" controls>
        <source :src="doc.src" type="audio/ogg" />

        <source :src="doc.src" type="audio/mpeg" />

        Your browser does not support the audio element.
      </audio>

      <audio v-else-if="doc.type === 'audio/mpeg'" controls>
        <source :src="doc.src" type="audio/ogg" />

        <source :src="doc.src" type="audio/mpeg" />

        Your browser does not support the audio element.
      </audio>

      <img v-else :src="doc.src" :class="classes" :alt="doc.name" />
      <!-- <h6>{{ doc.type }}</h6> -->
      <!-- </a> -->
    </div>
  </div>
</template>
