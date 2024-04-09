<script setup lang="ts">
defineProps({
  photos: { type: Array, default: () => [] },
})
const desc = ref(false)
const currentGallery = getCurrentInstance()
function userImages(photo: any) {
  currentGallery.emit('userimagesend', photo)
}
function downloadImage(photo: { links: { download: string | URL } }) {
  if (process.client) window.open(photo.links.download, '_blank')
}
</script>

<template>
  <div v-if="photos.length > 0">
    <pre>{{ photos[1] }}</pre>
    <div class="grid gap-4 md:grid-cols-3">
      <div
        v-for="(photo, index) in photos"
        :key="index"
        class="group relative mb-4 before:absolute before:inset-0 before:rounded-md before:bg-black before:bg-opacity-20 before:content-['']"
      >
        <img
          class="w-full rounded-md bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-150 hover:bg-indigo-500"
          :src="photo.urls.regular"
        />
        <div class="test__body absolute inset-0 flex flex-col p-8 text-white">
          <div class="relative">
            <a class="test__link absolute inset-0" target="_blank" href="/"></a>
            <h1 class="test__title mb-3 text-3xl font-bold group-hover:hidden">
              {{ photo.user.name }}
            </h1>
            <p class="test__author font-sm font-light group-hover:hidden">
              {{ photo.alt_description }}
            </p>
          </div>
          <div class="mt-auto grid grid-cols-2 gap-1 group-hover:hidden">
            <span
              v-for="(tg, indx) in photo.tags"
              :key="indx"
              class="test__tag rounded-md bg-white bg-opacity-60 px-4 py-1 text-black"
              >#{{ tg.title }}</span
            >
          </div>
          <BaseCard shape="curved" class="p-4">
            <SocialLinks shape="curved" />
          </BaseCard>
        </div>
      </div>
      <!-- <BaseCard
        shape="curved"
        elevated-hover
        class="relative p-3"
        v-for="(photo, index) in photos"
        :key="index"
      >
        <div class="absolute">
          <button class="o_btn_icon_square mr-2" @click="userImages(photo)">
            <Icon name="mdi:cursor-pointer" />
          </button>
          <button class="o_btn_icon_square" @click="downloadImage(photo)">
            <Icon name="mdi:download" />
          </button>
        </div>
        <Picture
          :src="photo.urls.regular"
          alt="Picture widget image description"
          shape="curved"
        />
        <div class="mx-1 -mt-8 mb-2 rounded bg-gray-200 p-2">
          <div>
            <div>
              <img
                :src="photo.user.profile_image.medium"
                alt=""
                class="h-12 w-12 rounded-full"
              />
            </div>
          </div>
          <div class="items-center">
            <p>
              Photo by: <b>{{ photo.user.name }}</b>
            </p>
            <p v-if="photo.user.portfolio_url">
              Portfolio:
              <a
                :href="photo.user.portfolio_url"
                target="_blank"
                class="text-sm text-blue-700"
              >
                {{ photo.user.portfolio_url }}</a
              >
            </p>
          </div>
          <button
            v-if="photo.description"
            class="o_btn_icon_square"
            @click="desc = !desc"
          >
            <Icon name="mdi:sort" />
          </button>
        </div>
        <div v-if="desc" class="item-center">
          <p class="items-center px-2 pb-2 text-center">
            {{ photo.description }}
          </p>
        </div>
      </BaseCard> -->
    </div>
  </div>
</template>
