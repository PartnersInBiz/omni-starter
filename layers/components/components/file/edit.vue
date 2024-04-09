<script setup lang="ts">
const { addToCollection: addToCollectionSpaceRegister, updateToId } = database()
const { client, account } = useAccount()
const { UploadsFolders, selectedFolder } = useUploads()

const open = ref(false)
const spaceInstance: any = getCurrentInstance()
const formSpaceRegister: any = ref({
  title: '',
  about: '',
  type: '',
  tags: [],
  members: [client.value.id],
  invitees: [],
  other: '',
  approval_needed: false,
  approvals: [],
  status: 'Pending',
  emails: [],
})

const selectedFolderEdit = useState('selectedFolderEdit', () => {
  return {}
})

onMounted(() => {
  formSpaceRegister.value = selectedFolderEdit.value
})
async function submitFolder() {
  try {
    console.log(selectedFolder.value)
    if (selectedFolder.value.title)
      formSpaceRegister.value.folders = selectedFolder.value.id
    const res = await updateToId(
      formSpaceRegister.value,
      'folders',
      formSpaceRegister.value,
    )
    const payload = { ...formSpaceRegister.value, ...res }
    UploadsFolders.value.push(payload)

    await addToCollectionSpaceRegister('notifications', {
      space_id: account.value.id,
      type: 'invite',
      title: 'Filemanage Folder Invite',
      message: `<p><b>Folder</b> invite ${formSpaceRegister.value.title}</p>`,
      notification_read: 'user',
      notification_action: 'accept',
      status: 'unread',
      col: 'folders',
      component: 'notifications-invite-accept',
      icon: 'mdi:check-circle',
      colour: 'green',
    })
  } catch (e) {
    console.error(e)
  }

  formSpaceRegister.value = {
    title: '',
    about: '',
    type: 'Folder',
    tags: [],
    members: [client.value.id],
    invitees: [],
    other: '',
    approval_needed: false,
    approvals: [],
    status: 'Pending',
    market: false,
    parent: [],
    size: 0,
  }
  spaceInstance.emit('close')
}

const emailTypes = ref([
  'Transactional',
  'Newsletter',
  'Announcement',
  'Event invitation',
  'Sales',
  'Follow-up',
  'Onboarding',
  'Survey',
  'Marketing',
  'Customer service',
  'Other',
])

const schema: any = ref({
  options: {
    input_class: { value: 'o_input' },
    search_button_class: { value: 'o_btn_icon_square' },
    icon: { value: 'mdi:magnify' },
  },
})

const userinvite = (us: { id: any }) => {
  console.log(us)
  //see if in array, if in array then delete, if not in array then add
  if (formSpaceRegister.value.invitees.includes(us.id)) {
    formSpaceRegister.value.invitees = formSpaceRegister.value.invitees.filter(
      (item: any) => item !== us.id,
    )
  } else {
    formSpaceRegister.value.invitees.push(us.id)
  }
  formSpaceRegister.value.invitees = formSpaceRegister.value.invitees.filter(
    function (x: undefined) {
      return x !== undefined
    },
  )
}

const userapproval = (us: { id: any }) => {
  console.log(us)
  //see if in array, if in array then delete, if not in array then add
  if (formSpaceRegister.value.approvals.includes(us.id)) {
    formSpaceRegister.value.approvals =
      formSpaceRegister.value.approvals.filter((item: any) => item !== us.id)
  } else {
    formSpaceRegister.value.approvals.push(us.id)
  }
  // formSpaceRegister.value.invitees.push(us.id)
}

const input = (data: { path: undefined; bubbles: undefined }) => {
  if (data && data.path === undefined && data.bubbles === undefined)
    formSpaceRegister.value.about = data
}
const removeUser = (us: { id: any }) => {
  console.log(us)
  //see if in array, if in array then delete, if not in array then add
  formSpaceRegister.value.invitees = formSpaceRegister.value.invitees.filter(
    (item: any) => item !== us.id,
  )
  formSpaceRegister.value.invitees = formSpaceRegister.value.invitees.filter(
    function (x: undefined) {
      return x !== undefined
    },
  )
}
const uploadAdd = (data: any) => {
  console.log(data)
  formSpaceRegister.value.images = data
}
</script>
<template>
  <div class="theme_300 font-sans text-base font-normal">
    <div class="theme_300 overflow-x-hidden">
      <div
        x-bind:aria-expanded="open"
        :class="{
          'ltr:-mr-64 ltr:ml-64 rtl:-ml-64 rtl:mr-64 md:ltr:mx-0 md:rtl:mx-0':
            open,
          'ltr:mx-0 rtl:mx-0 md:ltr:ml-64 md:rtl:mr-64': !open,
        }"
        class="flex min-h-screen flex-col transition-all duration-500 ease-in-out ltr:ml-64 rtl:mr-64"
      >
        <div class="-mt-2">
          <div class="mx-auto p-2">
            <div class="flex flex-row flex-wrap">
              <div class="mb-6 w-full max-w-full shrink px-4">
                <div class="theme_100 h-full rounded-lg p-6 shadow-lg">
                  <div class="-mx-4 flex flex-row flex-wrap">
                    <div class="mb-4 w-full max-w-full shrink px-4">
                      <label for="inputtitle" class="o_label">Title</label>
                      <input
                        v-model="formSpaceRegister.title"
                        type="text"
                        class="o_input"
                        id="inputtitle"
                      />
                    </div>
                    <div class="mb-4 w-full max-w-full shrink px-4">
                      <label for="inputbudget" class="o_label">About</label>
                      <formgenerator-inputs-quill
                        @input="input"
                        :placeholder="formSpaceRegister.about"
                      />
                    </div>

                    <div class="w-full max-w-full shrink px-4">
                      <client-only>
                        <TagsSelect
                          type="emailcontent"
                          :show-add="true"
                          @selected-tag="formSpaceRegister.tags = $event"
                        />
                      </client-only>
                    </div>

                    <div class="mb-4 w-full max-w-full shrink px-4">
                      <label for="inputtitle" class="o_label">User</label>
                      <user-search :schema="schema" @input="userinvite" />
                      <user-groups
                        :users="formSpaceRegister.invitees"
                        @input="removeUser"
                      />
                    </div>

                    <div class="w-full p-4">
                      <FileButton @upload-add="uploadAdd" />
                      <FileView
                        :images="formSpaceRegister.images"
                        @clicked="formSpaceRegister.images.splice($event, 1)"
                      />
                    </div>

                    <div class="w-full max-w-full shrink px-4">
                      <button @click="submitFolder" class="o_btn_primarys">
                        Add new folder
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          fill="currentColor"
                          class="bi bi-plus-lg inline-block ltr:ml-1 rtl:mr-1"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
