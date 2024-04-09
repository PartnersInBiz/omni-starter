<script setup lang="ts">
defineProps({
  photos: { type: Array, default: () => [] },
})
const em: any = getCurrentInstance()
const userImages = (photo: any) => {
  em.emit('userimagesend', photo)
}
</script>

<template>
  <div v-if="photos.length > 0">
    <div class="grid gap-4 md:grid-cols-3">
      <div
        v-for="(photo, index) in photos"
        :key="index"
        class="group relative mb-4 before:absolute before:inset-0 before:rounded-md before:bg-black before:bg-opacity-20 before:content-['']"
      >
        <img class="w-full rounded-md" :src="photo.urls.regular" />
        <div class="test__body absolute inset-0 flex flex-col p-8 text-white">
          <div class="relative">
            <a class="test__link absolute inset-0" target="_blank" href="/"></a>
            <h1 class="test__title mb-1 text-xl font-bold group-hover:hidden">
              {{ photo.user.name }}
            </h1>
            <p class="test__author text-sm font-light group-hover:hidden">
              {{ photo.alt_description }}
            </p>
          </div>
          <div class="mt-auto group-hover:hidden">
            <TagListCompact
              shape="curved"
              :tags="
                photo.tags.map((tg, ind) => {
                  return { id: ind, name: tg.title, highlight: true }
                })
              "
            />
          </div>
          <BaseCard
            shape="curved"
            class="group-hover:scale-120 z-50 mt-auto hidden p-4 transition delay-150 duration-300 ease-in-out group-hover:block group-hover:translate-y-20"
          >
            <UnsplashActions
              @select-image="userImages"
              @created="created"
              shape="curved"
              :photo="photo"
            />
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>
