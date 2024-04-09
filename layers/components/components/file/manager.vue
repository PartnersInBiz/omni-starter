<script setup lang="ts">
let fileManager = defineProps({
  linkedId: {
    type: String,
    default: '',
  },
})
const toaster = useToaster()

const { getColWhere, setById, deleteDocu } = useFirebaseFirestore()

const {
  UploadsItems: files,
  UploadsFolders,
  selectedFolder,
  selectedFolders,
  filteredItems,
  filteredFolders,
} = useUploads()
const { client } = useAccount()

const { $swal } = useNuxtApp()

const tab = ref('all')
const tabs = ref(1)
const open = ref(false)
const addfile = ref(false)
const showWhoseFile = ref('My')
const search = ref('')
const folders: any = useState('folders', () => {
  return []
})

const filteredFiles = computed(() => {
  if (search.value === '') {
    return filteredItems.value
  } else {
    return filteredItems.value.filter((file: any) => {
      return file.name.toLowerCase().includes(search.value.toLowerCase())
    })
  }
})
const dragItem: any = ref({})
function startDragSchema(ev: {
  dataTransfer: { setData: (arg0: string, arg1: string) => void }
}) {
  dragItem.value = ev
}
const notificationOpen = useState<any>('notificationOpen', () => {
  return {
    open: false,
    text: '',
    color: 'o_gradient',
  }
})
function dropChanges(ev: { id: any }) {
  // if(dragItem.value.folders)
  //   dragItem.value.folders.push(ev.id)
  // else
  dragItem.value.folders = ev.id
  let collection = dragItem.value.type == 'folders' ? 'Folder' : 'uploads'
  setById(dragItem.value.id, collection, dragItem.value)
  notificationOpen.value.open = true
  notificationOpen.value.text = 'Folder Added'
}

onMounted(async () => {
  getMedia()
})

const getMedia = async () => {
  if (fileManager.linkedId == '') {
    await getColWhere(
      'uploads',
      'linkedId',
      'array-contains',
      client.value.id,
    ).then((data: { result: any }) => {
      files.value = data
    })

    await getColWhere(
      'folders',
      'linkedId',
      'array-contains',

      client.value.id,
    ).then((data: { result: any }) => {
      UploadsFolders.value = data
    })
  } else {
    await getColWhere(
      'uploads',
      'linkedId',
      'array-contains',
      fileManager.linkedId,
    ).then((data: { result: any }) => {
      files.value = data
    })

    await getColWhere(
      'folders',
      'linkedId',
      'array-contains',
      fileManager.linkedId,
    ).then((data: { result: any }) => {
      UploadsFolders.value = data
    })
  }
}

const viewFiles = ref(false)
const viewFilesLayout = ref('list')
const selectedFiles: any = ref([])
const fileEmit: any = getCurrentInstance()
const sendDoc = (doc: any) => {
  selectedFiles.value.push(doc)
  fileEmit.emit('input', selectedFiles.value)
}

const sendDocOpen = (doc: any) => {
  if (doc.length > 0) {
    for (let i = 0; i < doc.length; i++) {
      selectedFiles.value.push(doc[i])
    }
  }
  fileEmit.emit('input', selectedFiles.value)
}

const addfiles = ref(false)

const selectfolder = (folder: any) => {
  selectedFolders.value.push(folder)
}

const editfiles = ref(false)
const selectedFolderEdit = useState('selectedFolderEdit', () => {
  return {}
})

const selectFolderEdit = (folder: any) => {
  selectedFolderEdit.value = folder
  editfiles.value = !editfiles.value
}
const isEditModal = ref(false)
const selectedFolderIndex = ref(0)
const folderCreated = (data: any) => {
  UploadsFolders.value.push(data)
}
const ImagesCreated = (data: any) => {
  files.value = [...files.value, ...data]
  addfiles.value = false
}
const removeFolder = async (index: number, id: string) => {
  let item = await deleteDocu('folders', id)
  UploadsFolders.value.splice(index, 1)
  toaster.clearAll()
  toaster.show({
    title: 'Success',
    message: `Record has been delete!`,
    color: 'danger',
    icon: 'mdi:trash-can',
    closable: true,
  })
}

const removeFile = async (index: number, id: string) => {
  let item = await deleteDocu('uploads', id)
  console.log('item', item)
  files.value.splice(index, 1)
  toaster.clearAll()
  toaster.show({
    title: 'Success',
    message: `Record has been delete!`,
    color: 'danger',
    icon: 'mdi:trash-can',
    closable: true,
  })
}
</script>
<template>
  <div>
    <Modal :open="addfiles" size="md" @close="addfiles = false">
      <div class="overflow-auto p-4">
        <file-folder-create
          :selected-folder="selectedFolder"
          :is-edit-modal="isEditModal"
          :selected-folder-index="selectedFolderIndex"
          @close="addfiles = false"
          @created="folderCreated"
        />
      </div>
    </Modal>

    <div>
      <ContentWrapper>
        <template #left>
          <BaseInput
            v-model="search"
            icon="lucide:search"
            shape="curved"
            placeholder="Filter files..."
            :classes="{
              wrapper: 'w-full sm:w-auto',
            }"
          />
        </template>
        <template #right>
          <BaseButton
            @click="addfiles = !addfiles"
            shape="curved"
            class="w-full sm:w-32"
            ><Icon name="lucide:plus" class="h-4 w-4" />
            <span>Add File</span></BaseButton
          >
          <BaseButton
            @click="addfile = !addfile"
            shape="curved"
            color="primary"
            class="w-full sm:w-36"
          >
            <div v-if="addfile">
              <Icon class="h-4 w-4" name="material-symbols:imagesmode" />
              View Media
            </div>
            <div v-if="!addfile">
              <Icon class="h-4 w-4" name="mdi:plus" />
              Add Media
            </div>
          </BaseButton>
        </template>
        <BaseCard shape="curved" class="p-6">
          <div class="mx-auto">
            <!-- row -->
            <div class="flex flex-row flex-wrap">
              <div class="mb-6 w-full max-w-full shrink px-4">
                <div>
                  <div class="relative">
                    <file-create
                      v-if="addfile"
                      :linked-id="linkedId"
                      @created="ImagesCreated"
                    ></file-create>
                    <div
                      x-data="{ tabs: 1 }"
                      class="-mx-4 flex flex-row flex-wrap"
                      v-if="!addfile"
                    >
                      <div class="mb-6 w-full max-w-full shrink px-4">
                        <div class="-mx-4 flex flex-row flex-wrap">
                          <a
                            @click.prevent="tabs = 1"
                            :class="{
                              'text-gray-800 dark:text-gray-200': tabs === 1,
                            }"
                            class="group w-full max-w-full shrink px-4 md:w-1/3"
                          >
                            <div
                              :class="{
                                'border-primarys rounded-lg border-l-2 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:bg-opacity-40 dark:text-gray-200':
                                  tabs === 1,
                              }"
                              class="block cursor-pointer rounded bg-white p-6 font-semibold shadow dark:bg-gray-800"
                            >
                              <div class="flex space-x-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="text-primarys_focus bi bi-folder2 inline-block ltr:mr-2 rtl:ml-2"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z"
                                  />
                                </svg>
                                <div class="text-xs">
                                  My Files {{ selectedFolder.title }}
                                </div>
                              </div>

                              <div
                                class="my-2 hidden h-2 w-full rounded-full bg-indigo-200 group-hover:block"
                                title="36%"
                              >
                                <div
                                  class="bg-primarys_focus h-full rounded-full text-center text-xs text-white"
                                  style="width: 36%"
                                ></div>
                              </div>
                              <div
                                class="hidden text-sm text-gray-500 group-hover:block dark:text-gray-100"
                              >
                                <span
                                  class="font-bold text-gray-700 dark:text-white"
                                  >11 Gb</span
                                >/30 Gb
                              </div>
                            </div>
                          </a>
                          <a
                            @click.prevent="tabs = 2"
                            :class="{
                              'text-gray-800 dark:text-gray-200': tabs === 2,
                            }"
                            class="group w-full max-w-full shrink cursor-pointer px-4 md:w-1/3"
                          >
                            <div
                              :class="{
                                'border-primarys rounded-lg border-l-2 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:bg-opacity-40 dark:text-gray-200':
                                  tabs === 2,
                              }"
                              class="block rounded bg-white p-6 font-semibold shadow dark:bg-gray-800"
                            >
                              <div class="flex space-x-2">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.5 6H10V8.5H7.5V6ZM10 15.5H7.5V13H10V15.5ZM10 10.5H7.5V8.5H10V10.5ZM18.5 6H21V8.5H18.5V6ZM21 15.5H18.5V13H21V15.5ZM21 10.5H18.5V8.5H21V10.5ZM15.75 16.5C16.4427 16.5 17 16.0573 17 15.5C17 14.9427 16.4427 14.5 15.75 14.5C15.0573 14.5 14.5 14.9427 14.5 15.5C14.5 16.0573 15.0573 16.5 15.75 16.5ZM15.75 11.5C16.4427 11.5 17 11.0573 17 10.5C17 9.94272 16.4427 9.5 15.75 9.5C15.0573 9.5 14.5 9.94272 14.5 10.5C14.5 11.0573 15.0573 11.5 15.75 11.5ZM4.25 16.5C4.94729 16.5 5.5 16.0573 5.5 15.5C5.5 14.9427 4.94729 14.5 4.25 14.5C3.55273 14.5 3 14.9427 3 15.5C3 16.0573 3.55273 16.5 4.25 16.5ZM4.25 11.5C4.94729 11.5 5.5 11.0573 5.5 10.5C5.5 9.94272 4.94729 9.5 4.25 9.5C3.55273 9.5 3 9.94272 3 10.5C3 11.0573 3.55273 11.5 4.25 11.5ZM15.75 6.5C16.4427 6.5 17 6.0573 17 5.5C17 4.94272 16.4427 4.5 15.75 4.5C15.0573 4.5 14.5 4.94272 14.5 5.5C14.5 6.0573 15.0573 6.5 15.75 6.5ZM4.25 6.5C4.94729 6.5 5.5 6.0573 5.5 5.5C5.5 4.94272 4.94729 4.5 4.25 4.5C3.55273 4.5 3 4.94272 3 5.5C3 6.0573 3.55273 6.5 4.25 6.5Z"
                                    fill="#fff"
                                  />
                                </svg>

                                <div class="text-xs">Unsplash</div>
                              </div>

                              <div
                                class="my-2 hidden h-2 w-full rounded-full bg-indigo-200 group-hover:block"
                                title="66%"
                              >
                                <div
                                  class="bg-primarys_focus h-full rounded-full text-center text-xs text-white"
                                  style="width: 66%"
                                ></div>
                              </div>
                              <div
                                class="hidden text-sm text-gray-500 group-hover:block dark:text-gray-100"
                              >
                                <span
                                  class="font-bold text-gray-700 dark:text-white"
                                  >80 Gb</span
                                >/120 Gb
                              </div>
                            </div>
                          </a>
                          <a
                            @click.prevent="tabs = 3"
                            :class="{
                              'text-gray-800 dark:text-gray-200 ': tabs === 3,
                            }"
                            class="group w-full max-w-full shrink cursor-pointer px-4 md:w-1/3"
                          >
                            <div
                              :class="{
                                'border-primarys rounded-lg border-l-2 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:bg-opacity-40 dark:text-gray-200':
                                  tabs === 3,
                              }"
                              class="block rounded bg-white p-6 font-semibold shadow dark:bg-gray-800"
                            >
                              <div class="flex space-x-2">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.6 20 4 16.4 4 12C4 7.6 7.6 4 12 4C16.4 4 20 7.6 20 12C20 16.4 16.4 20 12 20Z"
                                    fill="#E50914"
                                  />
                                  <path
                                    d="M12 7C10.9 7 10 7.9 10 9C10 10.1 10.9 11 12 11C13.1 11 14 10.1 14 9C14 7.9 13.1 7 12 7Z"
                                    fill="#E50914"
                                  />
                                  <path
                                    d="M12 14C10.9 14 10 14.9 10 16C10 17.1 10.9 18 12 18C13.1 18 14 17.1 14 16C14 14.9 13.1 14 12 14Z"
                                    fill="#E50914"
                                  />
                                </svg>
                                <div class="text-xs">Dall-E</div>
                              </div>

                              <div
                                class="my-2 hidden h-2 w-full rounded-full bg-indigo-200 group-hover:block"
                                title="66%"
                              >
                                <div
                                  class="bg-primarys_focus h-full rounded-full text-center text-xs text-white"
                                  style="width: 66%"
                                ></div>
                              </div>
                              <div
                                class="hidden text-sm text-gray-500 group-hover:block dark:text-gray-100"
                              >
                                <span
                                  class="font-bold text-gray-700 dark:text-white"
                                  >80 Gb</span
                                >/120 Gb
                              </div>
                            </div>
                          </a>
                          <!-- <a @click.prevent="tabs = 4" :class="{ 'text-gray-800 dark:text-gray-200': tabs === 4 }"
                              class="flex-shrink w-full max-w-full px-4 group md:w-1/3">
                              <div
                                :class="{ 'bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40 text-gray-800 dark:text-gray-200 rounded': tabs === 4 }"
                                class="block p-6 font-semibold bg-white rounded shadow dark:bg-gray-800">
                                <div class="flex space-x-2">
                                  <svg viewBox="0 0 87.3 78" class="inline-block w-4 h-4 ltr:mr-2 rtl:ml-2"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
                                      fill="#0066da" />
                                    <path
                                      d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
                                      fill="#00ac47" />
                                    <path
                                      d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
                                      fill="#ea4335" />
                                    <path
                                      d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
                                      fill="#00832d" />
                                    <path
                                      d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
                                      fill="#2684fc" />
                                    <path
                                      d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
                                      fill="#ffba00" />
                                  </svg>
                                  <div class="text-xs">Google Drive</div>
                                </div>

                                <div class="hidden w-full h-2 my-2 bg-indigo-200 rounded-full group-hover:block"
                                  title="66%">
                                  <div class="h-full text-xs text-center text-white rounded-full bg-primarys_focus"
                                    style="width:66%"></div>
                                </div>
                                <div class="hidden text-sm text-gray-500 dark:text-gray-100 group-hover:block">
                                  <span class="font-bold text-gray-700 dark:text-white">80 Gb</span>/120 Gb
                                </div>
                              </div>
                            </a> -->
                          <!-- <a @click.prevent="tabs = 5" :class="{ 'text-gray-800 dark:text-gray-200': tabs === 5 }"
                              class="flex-shrink w-full max-w-full px-4 group md:w-1/3">
                              <div
                                :class="{ 'bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40 text-gray-800 dark:text-gray-200 rounded': tabs === 5 }"
                                class="block p-6 font-semibold bg-white rounded shadow dark:bg-gray-800">
                                <div class="flex space-x-2">
                                  <svg xmlns="http://www.w3.org/2000/svg"
                                    class="inline-block text-primarys_focus ltr:mr-2 rtl:ml-2" width="1rem" height="1rem"
                                    fill="currentColor" viewBox="0 0 512 512">
                                    <path
                                      d="M256.32,126.24,136.16,204.49l120.16,78.24L136.16,361,16,282.08l120.16-78.24L16,126.24,136.16,48ZM135.52,385.76l120.16-78.25,120.16,78.25L255.68,464Zm120.8-103.68,120.16-78.24-120.16-77.6L375.84,48,496,126.24,375.84,204.49,496,282.73,375.84,361Z" />
                                  </svg>
                                  <div class="text-xs">Dropbox</div>
                                </div>

                                <div class="hidden w-full h-2 my-2 bg-indigo-200 rounded-full group-hover:block"
                                  title="20%">
                                  <div class="h-full text-xs text-center text-white rounded-full bg-primarys_focus"
                                    style="width:20%"></div>
                                </div>
                                <div class="hidden text-sm text-gray-500 dark:text-gray-100 group-hover:block">
                                  <span class="font-bold text-gray-700 dark:text-white">50 Gb</span>/256 Gb
                                </div>
                              </div>
                            </a> -->
                        </div>
                      </div>
                      <div
                        class="w-full max-w-full shrink px-4"
                        v-if="tabs == 2"
                      >
                        <div x-data="{ tab: 'all' }" class="relative">
                          <h3
                            class="mb-3 text-lg font-semibold text-gray-600 dark:text-gray-200"
                          >
                            Unsplash
                          </h3>
                          <div>
                            <Unsplash @input="sendDocOpen" />
                          </div>
                        </div>
                      </div>
                      <div
                        class="w-full max-w-full shrink px-4"
                        v-if="tabs == 3"
                      >
                        <div x-data="{ tab: 'all' }" class="relative">
                          <h3
                            class="mb-3 text-lg font-semibold text-gray-600 dark:text-gray-200"
                          >
                            Dal-E
                          </h3>
                          <div>
                            <open-ai-image-create @input="sendDocOpen" />
                          </div>
                        </div>
                      </div>

                      <div
                        class="w-full max-w-full shrink px-4"
                        v-if="tabs == 1"
                      >
                        <div x-data="{ tab: 'all' }" class="relative">
                          <h3
                            class="mb-3 text-lg font-semibold text-gray-600 dark:text-gray-200"
                          >
                            Quick Access
                          </h3>
                          <!-- filter start -->
                          <div class="mb-6 inline-block">
                            <a
                              @click.prevent="tab = 'all'"
                              :class="{
                                'dark:bg-opacity/40 bg-gray-100 dark:bg-gray-900':
                                  tab === 'all',
                              }"
                              class="mb-2 inline-block rounded px-4 py-2 text-center shadow hover:bg-gray-100 ltr:mr-2 rtl:ml-2 dark:hover:bg-gray-900"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="text-primarys_focus bi bi-file-earmark inline-block ltr:mr-1 rtl:ml-1"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
                                /></svg
                              >All
                            </a>
                            <a
                              @click.prevent="tab = 'image'"
                              :class="{
                                'dark:bg-opacity/40 bg-gray-100 dark:bg-gray-900':
                                  tab === 'image',
                              }"
                              class="mb-2 inline-block rounded px-4 py-2 text-center shadow hover:bg-gray-100 ltr:mr-2 rtl:ml-2 dark:hover:bg-gray-900"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-file-earmark-image inline-block text-purple-500 ltr:mr-1 rtl:ml-1"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                                />
                                <path
                                  d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z"
                                /></svg
                              >Image
                            </a>
                            <a
                              @click.prevent="tab = 'video'"
                              :class="{
                                'dark:bg-opacity/40 bg-gray-100 dark:bg-gray-900':
                                  tab === 'video',
                              }"
                              class="mb-2 inline-block rounded px-4 py-2 text-center shadow hover:bg-gray-100 ltr:mr-2 rtl:ml-2 dark:hover:bg-gray-900"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-file-play inline-block text-red-500 ltr:mr-1 rtl:ml-1"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M6 10.117V5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43z"
                                />
                                <path
                                  d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
                                /></svg
                              >Video
                            </a>
                            <a
                              @click.prevent="tab = 'music'"
                              :class="{
                                'bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40':
                                  tab === 'music',
                              }"
                              class="mb-2 inline-block rounded px-4 py-2 text-center shadow hover:bg-gray-100 ltr:mr-2 rtl:ml-2 dark:hover:bg-gray-900"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-file-earmark-music inline-block text-yellow-600 ltr:mr-1 rtl:ml-1"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M11 6.64a1 1 0 0 0-1.243-.97l-1 .25A1 1 0 0 0 8 6.89v4.306A2.572 2.572 0 0 0 7 11c-.5 0-.974.134-1.338.377-.36.24-.662.628-.662 1.123s.301.883.662 1.123c.364.243.839.377 1.338.377.5 0 .974-.134 1.338-.377.36-.24.662-.628.662-1.123V8.89l2-.5V6.64z"
                                />
                                <path
                                  d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"
                                /></svg
                              >Audio
                            </a>
                            <a
                              @click.prevent="tab = 'zip'"
                              :class="{
                                'dark:bg-opacity/40 bg-gray-100 dark:bg-gray-900':
                                  tab === 'zip',
                              }"
                              class="mb-2 inline-block rounded px-4 py-2 text-center shadow hover:bg-gray-100 ltr:mr-2 rtl:ml-2 dark:hover:bg-gray-900"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="text-primarys_focus bi bi-file-zip inline-block ltr:mr-1 rtl:ml-1"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M6.5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V7.5zm2 0h-1v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.93-.62-.4-1.598a1 1 0 0 1-.03-.243V7.5z"
                                />
                                <path
                                  d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm5.5-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9v1H8v1h1v1H8v1h1v1H7.5V5h-1V4h1V3h-1V2h1V1z"
                                /></svg
                              >Zip
                            </a>
                            <a
                              @click.prevent="tab = 'others'"
                              :class="{
                                'bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40':
                                  tab === 'others',
                              }"
                              class="mb-2 inline-block rounded px-4 py-2 text-center shadow hover:bg-gray-100 ltr:mr-2 rtl:ml-2 dark:hover:bg-gray-900"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="text-primarys_focus bi bi-file-earmark inline-block ltr:mr-1 rtl:ml-1"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
                                /></svg
                              >Others
                            </a>
                          </div>
                          <div class="flex items-center justify-between">
                            <div
                              class="mb-3 flex items-center space-x-2 text-lg font-semibold text-gray-600 dark:text-gray-200"
                            >
                              <div
                                class="cursor-pointer"
                                @click="
                                  ;(selectedFolders = []), (selectedFolder = {})
                                "
                              >
                                My Files
                              </div>
                              <div
                                class="cursor-pointer text-sm"
                                v-for="(f, index) in selectedFolders"
                                :key="index"
                                @drop.prevent="dropChanges(f)"
                                @dragover.prevent="allowDropd"
                                @click="
                                  ;(selectedFolders = selectedFolders.slice(
                                    index,
                                    selectedFolders.length,
                                  )),
                                    (selectedFolder = f)
                                "
                              >
                                > {{ f.title }}
                              </div>
                            </div>

                            <div class="flex">
                              <button
                                type="button"
                                class="nui-focus border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-800 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                                tooltip="Start Upload"
                                @click="viewFiles = !viewFiles"
                              >
                                <Icon name="mdi:eye" />
                              </button>
                              <div class="ml-2 flex items-center">
                                <div class="flex">
                                  <button
                                    type="button"
                                    class="nui-focus border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-800 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                                    tooltip="Start Upload"
                                    @click="viewFilesLayout = 'grid'"
                                    v-if="viewFilesLayout === 'list'"
                                  >
                                    <Icon name="mdi:grid" />
                                  </button>
                                </div>
                                <button
                                  v-if="viewFilesLayout === 'grid'"
                                  type="button"
                                  class="nui-focus border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-800 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                                  tooltip="Start Upload"
                                  @click="viewFilesLayout = 'list'"
                                >
                                  <Icon name="mdi:list-box-outline" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div
                            v-if="viewFilesLayout === 'grid'"
                            class="flex flex-wrap space-x-4 space-y-2"
                          >
                            <tr
                              v-for="(file, index) in sortableAB(
                                filteredFolders,
                                'title',
                              )"
                              :key="index"
                              v-show="file.type.includes(tab) || tab === 'all'"
                              class="cursor-pointer"
                            >
                              <div class="flex">
                                <a
                                  class="inline-block hover:text-red-500 ltr:mr-2 rtl:ml-2"
                                  title="Delete"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-trash"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                    />
                                  </svg>
                                </a>
                                <a
                                  class="inline-block hover:text-green-500 ltr:mr-2 rtl:ml-2"
                                  title="Rename"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-pencil-square"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                    />
                                  </svg>
                                </a>
                                <a
                                  class="flex h-full items-center hover:text-blue-500"
                                  draggable="true"
                                  @dragstart="startDragSchema(file)"
                                  title="Drag"
                                >
                                  <Icon name="uil:draggabledots" />
                                </a>
                              </div>
                              <div
                                :class="`mr-1 relative group hover:border hover:border-primarys text-${randomUnoColor()}`"
                                @click="selectfolder(file)"
                                @drop.prevent="dropChanges(file)"
                                @dragover.prevent="allowDropd"
                              >
                                <Icon
                                  name="material-symbols:folder-open"
                                  size="200"
                                />

                                <div
                                  class="auto-x absolute left-0 top-0 flex h-full w-full items-center justify-center text-white"
                                >
                                  <div class="relative">
                                    <div
                                      v-if="file.images"
                                      class="z-50 text-white"
                                    >
                                      <div
                                        v-if="file.images.length > 0"
                                        class="mt-8"
                                      >
                                        <p
                                          class="absolute -ml-10 -mt-12 group-hover:text-xl"
                                        >
                                          {{ file.title }}
                                        </p>

                                        <img
                                          :src="file.images[0].src"
                                          class="h-16 w-16"
                                        />
                                      </div>
                                      <p class="group-hover:text-xl" v-else>
                                        {{ file.title }}
                                      </p>
                                    </div>
                                    <p
                                      class="-ml-16 -mt-16 group-hover:text-xl"
                                      v-else
                                    >
                                      {{ file.title }}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </tr>
                            <tr
                              v-for="(file, index) in filteredFiles"
                              :key="index"
                              v-show="file.type.includes(tab) || tab === 'all'"
                              class="group cursor-pointer"
                            >
                              <div
                                class="group-hover:border-primarys mb-1 flex border"
                              >
                                <a
                                  class="inline-block hover:text-red-500 ltr:mr-2 rtl:ml-2"
                                  title="Delete"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-trash"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                    />
                                  </svg>
                                </a>
                                <a
                                  class="inline-block hover:text-green-500 ltr:mr-2 rtl:ml-2"
                                  title="Rename"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-pencil-square"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                    />
                                  </svg>
                                </a>
                                <a
                                  class="flex h-full items-center hover:text-blue-500"
                                  draggable="true"
                                  @dragstart="startDragSchema(file)"
                                  title="Drag"
                                >
                                  <Icon name="uil:draggabledots" />
                                </a>
                                <div
                                  class="group-hover:text-primarys ml-2 flex items-center text-xs"
                                >
                                  {{ file.name }}
                                </div>
                              </div>
                              <div
                                class="group-hover:border-primarys flex w-full justify-center p-1 group-hover:border"
                              >
                                <file-type
                                  :doc="file"
                                  @click="sendDoc(file)"
                                  classes=" h-48"
                                />
                              </div>
                            </tr>
                          </div>
                          <!-- content filter start -->
                          <table
                            class="w-full table-auto text-sm ltr:text-left rtl:text-right"
                            v-if="viewFilesLayout === 'list'"
                          >
                            <thead
                              class="bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40"
                            >
                              <tr>
                                <th class="px-4 py-3 font-normal">
                                  File name: {{ tab }}
                                </th>
                                <th
                                  class="hidden px-4 py-3 font-normal md:table-cell"
                                >
                                  Type
                                </th>
                                <th
                                  class="hidden px-4 py-3 font-normal md:table-cell"
                                  v-if="!viewFiles"
                                >
                                  Last modified
                                </th>
                                <th
                                  class="px-4 py-3 font-normal"
                                  v-if="!viewFiles"
                                >
                                  File size
                                </th>
                                <th
                                  class="px-4 py-3 font-normal"
                                  v-if="viewFiles"
                                >
                                  File
                                </th>
                                <th class="px-4 py-3 text-center font-normal">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-show="tab === 'others' || tab === 'all'"
                                v-for="(folder, index) in filteredFolders"
                                :key="index"
                                @drop.prevent="dropChanges(folder)"
                                @dragover.prevent="allowDropd"
                                class="hover:table_base-200"
                              >
                                <td
                                  class="cursor-pointer px-4 py-3 font-medium"
                                  @click="selectfolder(folder)"
                                >
                                  <a>
                                    <span class="text-primarys_focus mr-1">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-folder-fill inline-block"
                                        viewBox="0 0 16 16"
                                      >
                                        <path
                                          d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"
                                        />
                                      </svg> </span
                                    >{{ folder.title }}
                                  </a>
                                </td>
                                <td class="px-4 py-3 font-medium">File</td>

                                <td
                                  class="hidden px-4 py-3 font-medium md:table-cell"
                                  v-if="!viewFiles"
                                >
                                  {{ folder.createdDateTime }}
                                </td>
                                <td
                                  class="px-4 py-3 font-medium"
                                  v-if="!viewFiles"
                                >
                                  {{ folder.size }}
                                </td>
                                <td
                                  class="px-4 py-3 font-medium"
                                  v-if="viewFiles"
                                ></td>

                                <td
                                  class="flex justify-center space-x-2 px-4 py-3 text-center font-medium"
                                >
                                  <Popover size="sm">
                                    <div
                                      class="dark:bg-muted-700 shadow-muted-300/40 dark:shadow-muted-900/20 mr-1 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl"
                                    >
                                      <div
                                        class="bg-danger-500/20 flex h-8 w-8 items-center justify-center rounded-full"
                                      >
                                        <Icon
                                          name="ph:trash-duotone"
                                          class="text-danger-500 h-5 w-5"
                                        />
                                      </div>
                                    </div>

                                    <template #content>
                                      <PopoverContentDelete
                                        :title="folder.title"
                                        :subtitle="folder.type"
                                        text="Are you sure you want to delete?"
                                        icon="ph:trash-duotone"
                                        icon-color="danger"
                                        @delete="removeFolder(index, folder.id)"
                                      />
                                    </template>
                                  </Popover>
                                  <button
                                    type="button"
                                    class="border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                                    tooltip="Edit"
                                    @click="selectFolderEdit(folder)"
                                  >
                                    <Icon name="ic:twotone-edit" />
                                  </button>
                                  <button
                                    type="button"
                                    class="border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                                    tooltip="Drag"
                                    draggable="true"
                                    @dragstart="startDragSchema(folder)"
                                    title="Drag"
                                  >
                                    <Icon name="uil:draggabledots" />
                                  </button>
                                </td>
                              </tr>

                              <tr
                                v-for="(file, index) in filteredFiles"
                                :key="index"
                                v-show="
                                  file.type.includes(tab) || tab === 'all'
                                "
                              >
                                <td
                                  class="cursor-pointer px-4 py-3 font-medium"
                                  @click="sendDoc(file)"
                                >
                                  <div class="flex">
                                    <span class="text-primarys_focus mr-1">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        v-if="file.type.includes('video')"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-play-btn-fill inline-block text-red-500"
                                        viewBox="0 0 16 16"
                                      >
                                        <path
                                          d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
                                        />
                                      </svg>
                                      <svg
                                        v-if="file.type.includes('image')"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-image inline-block text-purple-500"
                                        viewBox="0 0 16 16"
                                      >
                                        <path
                                          d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                                        />
                                        <path
                                          d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"
                                        />
                                      </svg>
                                      <svg
                                        v-if="file.type.includes('audio')"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-music-note-beamed inline-block text-yellow-600"
                                        viewBox="0 0 16 16"
                                      >
                                        <path
                                          d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"
                                        />
                                        <path
                                          d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"
                                        />
                                      </svg>
                                    </span>
                                    <div
                                      class="w-28 cursor-pointer truncate"
                                      @click="sendDoc(file)"
                                    >
                                      {{ file.name }}
                                    </div>
                                  </div>
                                </td>
                                <td class="px-4 py-3 font-medium">
                                  {{ file.type }}
                                </td>
                                <td
                                  class="hidden px-4 py-3 font-medium md:table-cell"
                                  v-if="!viewFiles"
                                >
                                  {{ file.createdDateTime }}
                                </td>
                                <td
                                  class="px-4 py-3 font-medium"
                                  v-if="!viewFiles"
                                >
                                  {{ file.size }}
                                </td>
                                <td
                                  class="px-4 py-3 font-medium"
                                  v-if="viewFiles"
                                >
                                  <file-type :doc="file" classes="h-10" />
                                </td>

                                <td
                                  class="flex justify-center space-x-2 px-4 py-3 text-center font-medium"
                                >
                                  <Popover size="sm">
                                    <div
                                      class="dark:bg-muted-700 shadow-muted-300/40 dark:shadow-muted-900/20 mr-1 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl"
                                    >
                                      <div
                                        class="bg-danger-500/20 flex h-8 w-8 items-center justify-center rounded-full"
                                      >
                                        <Icon
                                          name="ph:trash-duotone"
                                          class="text-danger-500 h-5 w-5"
                                        />
                                      </div>
                                    </div>

                                    <template #content>
                                      <PopoverContentDelete
                                        :title="file.name"
                                        :subtitle="file.type"
                                        text="Are you sure you want to delete?"
                                        icon="ph:trash-duotone"
                                        icon-color="danger"
                                        @delete="removeFile(index, file.id)"
                                      />
                                    </template>
                                  </Popover>
                                  <button
                                    type="button"
                                    class="border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                                    tooltip="Edit"
                                    @click="viewFilesLayout = 'list'"
                                  >
                                    <Icon name="ic:twotone-edit" />
                                  </button>
                                  <button
                                    type="button"
                                    class="border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                                    tooltip="Drag"
                                    draggable="true"
                                    @dragstart="startDragSchema(file)"
                                    title="Drag"
                                  >
                                    <Icon name="uil:draggabledots" />
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>
      </ContentWrapper>
    </div>
  </div>
</template>
