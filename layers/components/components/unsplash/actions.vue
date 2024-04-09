<script setup lang="ts">
// TODO option to save and download file
const props: any = defineProps<{
  photo: any
}>()
const { UploadsItems } = useUploads()
const { add } = useFirebaseFirestore()
const downloadImage = (photo: { links: { download: string | URL } }) => {
  if (process.client) window.open(photo.links.download, '_blank')
}

const viewProfile = (photo: {
  user: { portfolio_url: string | URL | undefined }
}) => {
  if (process.client) window.open(photo.user.portfolio_url, '_blank')
}
const toaster = useToaster()
const em: any = getCurrentInstance()

const saveImage = async (photo: {
  alt_description: any
  urls: { regular: any }
}) => {
  const image: any = {
    name: photo.alt_description,
    src: photo.urls.regular,
    type: 'image/png',
    size: '',
  }

  let img = await add('uploads', image)
  console.log('img', img)
  UploadsItems.value.push(img)
  toaster.clearAll()
  toaster.show({
    title: 'Success',
    message: `Record has been created!`,
    color: 'success',
    icon: 'ph:check',
    closable: true,
  })
}
</script>

<template>
  <div class="flex w-full items-center justify-between gap-3">
    <div
      @click="$emit('selectImage')"
      data-tooltip="Use Image!"
      class="text-muted-400 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 hover:bg-indigo-800 hover:text-white hover:shadow-xl hover:shadow-indigo-500/30 dark:hover:shadow-indigo-800/30"
    >
      <Icon name="material-symbols:gesture-select" class="h-4 w-4" />
    </div>
    <div
      data-tooltip="Save Image!"
      @click="saveImage(photo)"
      class="text-muted-400 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 hover:bg-blue-800 hover:text-white hover:shadow-xl hover:shadow-indigo-500/30 dark:hover:shadow-indigo-800/30"
    >
      <Icon name="ph:floppy-disk-back-duotone" class="h-4 w-4" />
    </div>
    <div
      data-tooltip="Download Image!"
      @click="downloadImage(photo)"
      class="text-muted-400 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 hover:bg-blue-800 hover:text-white hover:shadow-xl hover:shadow-indigo-500/30 dark:hover:shadow-indigo-800/30"
    >
      <Icon name="solar:file-download-bold-duotone" class="h-4 w-4" />
    </div>
    <div
      data-tooltip="View Portfolio!"
      @click="viewProfile(photo)"
      class="text-muted-400 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 hover:bg-green-800 hover:text-white hover:shadow-xl hover:shadow-indigo-500/30 dark:hover:shadow-indigo-800/30"
    >
      <Icon name="ic:twotone-account-circle" class="h-4 w-4" />
    </div>
  </div>
</template>
