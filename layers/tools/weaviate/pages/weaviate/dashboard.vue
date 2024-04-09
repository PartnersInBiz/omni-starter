<script setup lang="ts">
definePageMeta({
  title: "Weaviate Dashboard",

  preview: {
    title: "Weaviate dashboard",
    description: "For HR management",
    categories: ["dashboards"],
    src: "/img/screens/dashboards-human-resources.png",
    srcDark: "/img/screens/dashboards-human-resources-dark.png",
    order: 12,
  },
});

const {
  weaviateClasses,
  weaviateDataTypes,
  weaviateCollections: classes,
  selectedClass,
  selectedClassProperties,
  properties,
  weaviateConfig,
  isDataTypeValid,
  isDataTypeValid2,
  weaviateClassesWithoutCrossReference,
  weaviateClassesWithCrossReference,
} = useWeaviate();
const { mainAccount, user, userContact } = useAccount();

const { ClassCreateWithSharding } = useWeaviateClassCreate();
const { ClassDelete } = useWeaviateClassDelete();
const { ClassRetrieveAll } = useWeaviateClassRetrieve();
const { RetrieveCrossReferenceProperty, RetrieveCrossReferenceProperties } =
  useWeaviateCrossReferenceRetrieve();
const { ObjectCreateWithId } = useWeaviateObjectCreate();
const { ObjectUpdate } = useWeaviateObjectUpdate();
const { ObjectRetrieveAll, ObjectRetrieveById } = useWeaviateObjectRetrieve();
const { DeleteObjectById } = useWeaviateObjectDelete();
const config = useRuntimeConfig();

const activeSetting = ref("submitted");
// Function to check if a dataType is present in the weaviateDataTypes array

const tagsDataTypes = computed(() => {
  if (weaviateDataTypes.value === undefined) {
    return [];
  }
  if (weaviateDataTypes.value) {
    return weaviateDataTypes.value.map((item: any) => {
      return {
        id: item,
        name: item,
        highlight: false,
      };
    });
  } else {
    return [];
  }
});

const tags = computed(() => {
  return classes.value.map((cls: any) => cls.class);
});

const addAllClasses = async () => {
  await weaviateClassesWithoutCrossReference.value.forEach(async (cls: any) => {
    let hasClass = classes.value.find((c: any) => c.class === cls.name);
    if (hasClass) {
      console.log("class exists");
      return;
    }

    let vectorizer = "text2vec-openai";
    let distance = "cosine";

    if (cls.name == "Media") {
      vectorizer = "multi2vec-palm";
      distance = "cosine";
      return;
    }
    let shard = await ClassCreateWithSharding(
      cls.name,
      cls.properties,
      vectorizer,
      distance
    );
    console.log(shard);
  });
};

const updateAllClasses = async () => {
  await weaviateClassesWithoutCrossReference.value.forEach(async (cls: any) => {
    let shard = await RetrieveCrossReferenceProperty(cls.name, cls.properties);
    console.log(shard);
  });
  await weaviateClassesWithCrossReference.value.forEach(async (cls: any) => {
    let shard = await RetrieveCrossReferenceProperty(cls.name, cls.properties);
    console.log(shard);
  });
  RetrieveAllData();
  return "done";
};

const RetrieveAllData = async () => {
  let res = await ClassRetrieveAll();
  console.log(res.classes);
  classes.value = res.classes;
};
const tagSelect = (tag: string) => {
  console.log(tag);
};

const selectClass = (cls: any) => {
  console.log(cls);
  selectedClass.value = cls;
  classObjects();
};

const removeClass = async (cls: any) => {
  console.log(cls);
  await ClassDelete(cls);
  RetrieveAllData();
};

onMounted(() => {
  RetrieveAllData();
});

const input = (search: string) => {
  console.log(search);
};
const SetOmni = async () => {
  console.log(mainAccount.value.uuid);
  const resultAccount: any = await ObjectCreateWithId(
    "Account",
    {
      name: mainAccount.value.name,
      description: mainAccount.value.description,
    },
    mainAccount.value.uuid
  );
  console.log(resultAccount);
};

const SetLoggedIn = async () => {
  await ObjectUpdate("User", user.value._additional.id, {
    linked_account: [
      {
        beacon: `${weaviateConfig.host}/${mainAccount.value.uuid}`,
      },
    ],
  });
  await ObjectUpdate("Contact", userContact.value._additional.id, {
    linked_account: [
      {
        beacon: `${weaviateConfig.host}/${mainAccount.value.uuid}`,
      },
    ],
  });

  await ObjectUpdate("Account", mainAccount.value.uuid, {
    access_contact: [
      {
        beacon: `${weaviateConfig.host}/${userContact.value._additional.id}`,
      },
    ],
    admins: [
      {
        beacon: `${weaviateConfig.host}/${user.value._additional.id}`,
      },
    ],
  });
};

const classObjects = async () => {
  console.log("classObjects", selectedClass.value.class);
  let search_param = "name _additional { id }";

  if (selectedClass.value.class === undefined) {
    return;
  } else if (
    selectedClass.value.class === "User" ||
    selectedClass.value.class === "Contact"
  ) {
    search_param = "first_name _additional { id }";
  } else if (selectedClass.value.class === "Email") {
    search_param = "email _additional { id }";
  }
  const res: any = await ObjectRetrieveAll(
    selectedClass.value.class,
    100,
    null,
    search_param
  );
  console.log("selectedClassProperties", res);
  selectedClassProperties.value = res;
};

const noCrossRef: any = ref([]);
const CrossRef: any = ref([]);

const showPopUp = ref(false);
const selectedProp = ref({});
const getProperty = async (property: any) => {
  console.log(property, selectedClass.value.class);
  console.log("ID ID", property._additional.id);
  let shard = await ObjectRetrieveById(
    selectedClass.value.class,
    property._additional.id
  );
  selectedProp.value = shard;
  showPopUp.value = true;
};

const deleteProperty = async (property: any) => {
  console.log(property);
  let shard = await DeleteObjectById(
    selectedClass.value.class,
    property._additional.id
  );
  console.log(shard);
  selectedClassProperties.value = selectedClassProperties.value.filter(
    (item: any) => item._additional.id !== property._additional.id
  );
};
</script>

<template>
  <div>
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 ltablet:col-span-8 lg:col-span-8">
        <div class="flex flex-col gap-6">
          <div class="px-6 py-12 bg-success-700 rounded-xl">
            <div class="flex flex-col items-center w-full gap-y-4 sm:flex-row">
              <div class="flex flex-col flex-1 px-4">
                <BaseAvatar
                  src="/img/logos/brands/weaviate.svg"
                  size="lg"
                  class="mb-3 border border-success-200/50 ring-success-200/50 ring-offset-success-600 ring-2 ring-offset-4"
                  @click="$router.push('/')"
                />
                <BaseHeading
                  as="h2"
                  size="3xl"
                  weight="bold"
                  lead="none"
                  class="ltablet:!text-2xl text-white"
                >
                  <span>Weaviate Settings.</span>
                </BaseHeading>
              </div>
              <div class="flex flex-col flex-1 h-full px-4 sm:px-6">
                <BaseParagraph size="xs" lead="tight" class="mb-3">
                  <span class="text-white">
                    Weaviate is an open source, AI-native vector database that
                    helps developers create intuitive and reliable AI-powered
                    applications.
                  </span>
                </BaseParagraph>

                <div class="flex gap-2 mt-auto">
                  <div class="mt-auto">
                    <BaseButton class="w-full" @click="addAllClasses">
                      <span>Add</span>
                    </BaseButton>
                  </div>

                  <div class="mt-auto">
                    <BaseButton class="w-full" @click="updateAllClasses">
                      <span>Update</span>
                    </BaseButton>
                  </div>
                </div>
              </div>
              <div
                class="flex flex-col flex-1 h-full px-4 border-success-300/60 sm:border-l sm:px-6"
              >
                <BaseHeading
                  as="h2"
                  size="md"
                  weight="semibold"
                  lead="tight"
                  class="mb-1 text-white"
                >
                  <span>About Weaviate</span>
                </BaseHeading>
                <BaseHeading
                  as="h2"
                  size="md"
                  weight="semibold"
                  lead="tight"
                  class="mb-1 text-white"
                >
                  <span> {{ weaviateConfig.type }}</span>
                </BaseHeading>

                <BaseParagraph size="xs" lead="tight" class="mb-3">
                  <span class="text-white">
                    {{ weaviateConfig.host }}
                  </span>
                </BaseParagraph>
                <div class="mt-auto">
                  <BaseButton class="w-full" @click="RetrieveAllData">
                    <span>Retrieve Classes</span>
                  </BaseButton>
                  <div class="flex mt-2 space-x-2">
                    <BaseButton class="w-full" @click="SetOmni">
                      <span>Account</span>
                    </BaseButton>

                    <BaseButton class="w-full" @click="SetLoggedIn">
                      <span>User</span>
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col items-center justify-between gap-6 sm:flex-row"
          >
            <div>
              <BaseHeading
                as="h3"
                size="lg"
                weight="semibold"
                lead="tight"
                class="mb-1 text-muted-800 dark:text-muted-100"
              >
                <span>Classes settings</span>
              </BaseHeading>
            </div>
            <div class="flex gap-2 sm:justify-end">
              <BaseButtonAction
                shape="curved"
                :color="activeSetting === 'submitted' ? 'success' : 'default'"
                @click="activeSetting = 'submitted'"
              >
                Submitted
              </BaseButtonAction>
              <BaseButtonAction
                shape="curved"
                :color="activeSetting === 'data' ? 'success' : 'default'"
                @click="activeSetting = 'data'"
              >
                All
              </BaseButtonAction>
              <BaseButtonAction
                shape="curved"
                :color="
                  activeSetting === 'reference_no' ? 'success' : 'default'
                "
                @click="activeSetting = 'reference_no'"
              >
                No Cross-Ref
              </BaseButtonAction>
              <BaseButtonAction
                shape="curved"
                :color="activeSetting === 'reference' ? 'success' : 'default'"
                @click="activeSetting = 'reference'"
              >
                Cross-Ref
              </BaseButtonAction>
              <BaseButtonAction
                shape="curved"
                :color="activeSetting === 'datatypes' ? 'success' : 'default'"
                @click="activeSetting = 'datatypes'"
              >
                Data Types
              </BaseButtonAction>
              <BaseButtonAction
                shape="curved"
                :color="activeSetting === 'props' ? 'success' : 'default'"
                @click="activeSetting = 'props'"
              >
                Properties
              </BaseButtonAction>
            </div>
          </div>
          <Modal
            :open="showPopUp"
            size="xl"
            footer-align="center"
            @close="showPopUp = false"
          >
            <div class="relative p-2 overflow-auto h-96">
              <BaseCard shape="curved text-xs h-96 overflow-auto">
                <pre>{{ selectedProp }}</pre>
              </BaseCard>
            </div>
          </Modal>
          <!-- Details -->
          <div class="grid grid-cols-12 mt-6 gap-x-6 gap-y-12">
            <div class="col-span-12" v-if="activeSetting == 'data'">
              <div class="space-y-2">
                <BaseCard
                  shape="curved"
                  class="text-muted-400 hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 flex min-w-[100px] items-center justify-center px-2 py-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg mb-4"
                  v-for="(cl, index) in weaviateClasses"
                  :key="index"
                >
                  <div class="text-center">
                    <div class="flex justify-between">
                      <BaseHeading
                        size="md"
                        weight="medium"
                        lead="tight"
                        class="mb-2 text-muted-800 dark:text-white"
                      >
                        {{ cl.name }}
                      </BaseHeading>

                      <BaseButtonIcon
                        shape="curved"
                        primary
                        class="mr-2 scale-75"
                        @click="ClassCreateWithSharding(cl.name, cl.properties)"
                      >
                        <Icon name="ph:seal-check-duotone" class="w-4 h-4" />
                      </BaseButtonIcon>
                    </div>

                    <FlexTableRow
                      v-for="(item, index) in cl.properties"
                      :key="index"
                      shape="rounded"
                    >
                      <template #start>
                        <FlexTableStart
                          label="Classes"
                          :hide-label="true"
                          :title="item.name"
                          :subtitle="item.description"
                          :icon="item.icon"
                        />
                      </template>
                      <template #end>
                        <FlexTableCell
                          label="status"
                          :hide-label="index > 0"
                          class="w-full sm:w-16"
                        >
                          <BaseTag
                            :color="
                              item.status === isDataTypeValid2(item.dataType)
                                ? 'success'
                                : 'muted'
                            "
                            shape="full"
                            flavor="pastel"
                            size="sm"
                          >
                            {{ item.dataType }}
                          </BaseTag>
                        </FlexTableCell>
                      </template>
                    </FlexTableRow>
                  </div>
                </BaseCard>
              </div>
            </div>
            <div class="col-span-12" v-if="activeSetting == 'reference_no'">
              <div class="space-y-2">
                <BaseCard
                  shape="curved"
                  class="text-muted-400 hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 flex min-w-[100px] items-center justify-center px-2 py-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg mb-4"
                  v-for="(cl, index) in weaviateClassesWithoutCrossReference"
                  :key="index"
                >
                  <div class="text-center">
                    <div class="flex justify-between">
                      <BaseHeading
                        size="md"
                        weight="medium"
                        lead="tight"
                        class="mb-2 text-muted-800 dark:text-white"
                      >
                        {{ cl.name }}
                      </BaseHeading>

                      <div>
                        <BaseButtonIcon
                          shape="curved"
                          primary
                          class="mr-2 scale-75"
                          @click="
                            ClassCreateWithSharding(cl.name, cl.properties)
                          "
                        >
                          <Icon name="ph:seal-check-duotone" class="w-4 h-4" />
                        </BaseButtonIcon>

                        <BaseButtonIcon
                          shape="curved"
                          primary
                          class="mr-2 scale-75"
                          @click="
                            RetrieveCrossReferenceProperties(
                              cl.name,
                              cl.properties
                            )
                          "
                        >
                          <Icon name="ph:activity-bold" class="w-4 h-4" />
                        </BaseButtonIcon>

                        <BaseButtonIcon
                          shape="curved"
                          primary
                          class="mr-2 scale-75"
                          @click="noCrossRef.push(index)"
                          v-if="!noCrossRef.includes(index)"
                        >
                          <Icon name="ph:eye" class="w-4 h-4" />
                        </BaseButtonIcon>
                        <BaseButtonIcon
                          shape="curved"
                          primary
                          class="mr-2 scale-75"
                          @click="noCrossRef.splice(index, 1)"
                          v-if="noCrossRef.includes(index)"
                        >
                          <Icon name="ph:eye-closed" class="w-4 h-4" />
                        </BaseButtonIcon>
                      </div>
                    </div>
                    <div v-if="noCrossRef.includes(index)">
                      <FlexTableRow
                        v-for="(item, indx) in cl.properties"
                        :key="indx"
                        shape="rounded"
                      >
                        <template #start>
                          <FlexTableStart
                            label="Classes"
                            :hide-label="true"
                            :title="item.name"
                            :subtitle="item.description"
                            :icon="item.icon"
                          />
                        </template>
                        <template #end>
                          <FlexTableCell
                            label="status"
                            :hide-label="index > 0"
                            class="w-full sm:w-16"
                          >
                            <BaseTag
                              :color="
                                item.status === 'new' ? 'success' : 'muted'
                              "
                              shape="full"
                              flavor="pastel"
                              size="sm"
                            >
                              {{ item.dataType }}
                            </BaseTag>
                          </FlexTableCell>
                        </template>
                      </FlexTableRow>
                    </div>
                  </div>
                </BaseCard>
              </div>
            </div>
            <div class="col-span-12" v-if="activeSetting == 'reference'">
              <div class="space-y-2">
                <BaseCard
                  shape="curved"
                  class="text-muted-400 hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-500 flex min-w-[100px] items-center justify-center px-2 py-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg mb-4"
                  v-for="(cl, index) in weaviateClassesWithCrossReference"
                  :key="index"
                >
                  <div class="text-center">
                    <div class="flex justify-between">
                      <BaseHeading
                        size="md"
                        weight="medium"
                        lead="tight"
                        class="mb-2 text-muted-800 dark:text-white"
                      >
                        {{ cl.name }}
                      </BaseHeading>

                      <div>
                        <BaseButtonIcon
                          shape="curved"
                          primary
                          class="mr-2 scale-75"
                          @click="
                            RetrieveCrossReferenceProperties(
                              cl.name,
                              cl.properties
                            )
                          "
                        >
                          <Icon name="ph:seal-check-duotone" class="w-4 h-4" />
                        </BaseButtonIcon>
                        <BaseButtonIcon
                          shape="curved"
                          primary
                          class="mr-2 scale-75"
                          @click="CrossRef.push(index)"
                          v-if="!CrossRef.includes(index)"
                        >
                          <Icon name="ph:eye" class="w-4 h-4" />
                        </BaseButtonIcon>
                        <BaseButtonIcon
                          shape="curved"
                          primary
                          class="mr-2 scale-75"
                          @click="CrossRef.splice(index, 1)"
                          v-if="CrossRef.includes(index)"
                        >
                          <Icon name="ph:eye-closed" class="w-4 h-4" />
                        </BaseButtonIcon>
                      </div>
                    </div>
                    <div v-if="CrossRef.includes(index)">
                      <FlexTableRow
                        v-for="(item, index) in cl.properties"
                        :key="index"
                        shape="rounded"
                      >
                        <template #start>
                          <FlexTableStart
                            label="Classes"
                            :hide-label="true"
                            :title="item.name"
                            :subtitle="item.description"
                            :icon="item.icon"
                          />
                        </template>
                        <template #end>
                          <FlexTableCell
                            label="status"
                            :hide-label="index > 0"
                            class="w-full sm:w-16"
                          >
                            <BaseTag
                              :color="
                                item.status === 'new' ? 'success' : 'muted'
                              "
                              shape="full"
                              flavor="pastel"
                              size="sm"
                            >
                              {{ item.dataType }}
                            </BaseTag>
                          </FlexTableCell>
                          <FlexTableCell label="action" :hide-label="index > 0">
                            <BaseButtonIcon
                              shape="curved"
                              primary
                              class="mr-2 scale-75"
                              @click="
                                RetrieveCrossReferenceProperty(cl.name, {
                                  name: item.name,
                                  dataType: item.dataType,
                                })
                              "
                            >
                              <Icon
                                name="ph:seal-check-duotone"
                                class="w-4 h-4"
                              />
                            </BaseButtonIcon>
                          </FlexTableCell>
                        </template>
                      </FlexTableRow>
                    </div>
                  </div>
                </BaseCard>
              </div>
            </div>
            <div class="col-span-12" v-if="activeSetting == 'datatypes'">
              <div class="space-y-2">
                <TagListCompact :tags="tagsDataTypes" shape="curved" />
              </div>
            </div>
            <div class="col-span-12" v-if="activeSetting == 'submitted'">
              <div class="space-y-2">
                <FlexTableRow
                  v-for="(item, index) in classes"
                  :key="index"
                  shape="rounded"
                >
                  <template #start>
                    <FlexTableStart
                      label="Classes"
                      :hide-label="index > 0"
                      :title="item.class"
                      :subtitle="item.vectorIndexType"
                      :icon="item.icon"
                    />
                  </template>
                  <template #end>
                    <FlexTableCell
                      label="vectorizer"
                      :hide-label="index > 0"
                      class="w-full sm:w-10"
                    >
                      <span
                        class="font-sans text-sm text-muted-500 dark:text-muted-400"
                      >
                        {{ item.vectorizer }}
                      </span>
                    </FlexTableCell>
                    <FlexTableCell
                      label="status"
                      :hide-label="index > 0"
                      class="w-full sm:w-16"
                    >
                      <BaseTag
                        :color="item.status === 'new' ? 'success' : 'muted'"
                        shape="full"
                        flavor="pastel"
                        size="sm"
                      >
                        {{ item.status }}
                      </BaseTag>
                    </FlexTableCell>
                    <FlexTableCell label="action" :hide-label="index > 0">
                      <BaseButtonIcon
                        shape="curved"
                        color="danger"
                        class="mr-2 scale-75"
                        @click="removeClass(item.class)"
                      >
                        <Icon name="ph:trash" class="w-4 h-4" />
                      </BaseButtonIcon>

                      <BaseButtonIcon
                        shape="curved"
                        primary
                        class="mr-2 scale-75"
                        @click="selectClass(item)"
                      >
                        <Icon
                          :name="
                            selectedClass?.class == item.class
                              ? 'ph:seal-check-duotone'
                              : 'ph:seal-bold'
                          "
                          class="w-4 h-4"
                        />
                      </BaseButtonIcon>
                    </FlexTableCell>
                  </template>
                </FlexTableRow>
              </div>
            </div>
            <div class="col-span-12" v-if="activeSetting == 'props'">
              <div class="w-full space-y-2">
                <FlexTableRow
                  v-for="(item, index) in selectedClassProperties"
                  :key="index"
                  shape="rounded"
                >
                  <template #start>
                    <FlexTableCell
                      v-for="(val, key, indx) in item"
                      :key="indx"
                      v-if="typeof val !== 'object'"
                      :label="key"
                      :hide-label="index > 0"
                      class="w-full sm:w-10"
                    >
                      <span
                        class="font-sans text-sm text-muted-500 dark:text-muted-400"
                      >
                        {{ val }}
                      </span>
                    </FlexTableCell>
                  </template>
                  <template #end>
                    <FlexTableCell label="action" :hide-label="index > 0">
                      <BaseButtonIcon
                        shape="curved"
                        primary
                        class="mr-2 scale-75"
                        @click="getProperty(item)"
                      >
                        <Icon
                          :name="
                            selectedClass?.class == item.class
                              ? 'ph:seal-check-duotone'
                              : 'ph:seal-bold'
                          "
                          class="w-4 h-4"
                        />
                      </BaseButtonIcon>

                      <BaseButtonIcon
                        shape="curved"
                        primary
                        class="mr-2 scale-75"
                        @click="deleteProperty(item)"
                      >
                        <Icon :name="'ph:trash-duotone'" class="w-4 h-4" />
                      </BaseButtonIcon>
                    </FlexTableCell>
                  </template>
                </FlexTableRow>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 ltablet:col-span-4 lg:col-span-4">
        <div class="flex flex-col gap-6">
          <BaseCard shape="curved" class="p-6">
            <div class="flex items-center justify-between w-full">
              <SearchCompact
                shape="curved"
                @input="input"
                :tags="tags"
                @select="tagSelect"
              />
            </div>
          </BaseCard>
          <BaseCard shape="curved" class="p-6">
            <BaseHeading
              as="h2"
              size="md"
              weight="semibold"
              lead="tight"
              class="mb-1 text-white"
            >
              <span> {{ selectedClass?.class }}</span>
            </BaseHeading>
            <BaseParagraph size="xs" lead="tight" class="mb-3">
              <span class="text-white"> Selected Class </span>
            </BaseParagraph>
            <ItemListCompact :items="properties" />
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>