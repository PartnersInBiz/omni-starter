<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: "straight" | "rounded" | "curved" | "full";
    title: string;
    labels: string[];
    recentFiles: {
      id: number;
      icon: string;
      name: string;
      type: string;
    }[];
    savedFiles: {
      id: number;
      icon: string;
      name: string;
      type: string;
    }[];
  }>(),
  {
    shape: "rounded",
  }
);
</script>

<template>
  <div>
    <TabbedContent :title="title" :labels="labels" :shape="props.shape">
      <template #tab-1>
        <div class="space-y-6">
          <div
            v-for="file in recentFiles"
            :key="file.id"
            class="flex items-center gap-2"
          >
            <img :src="file.icon" class="h-10 w-10" :alt="file.name" />
            <div>
              <BaseHeading
                as="h3"
                size="sm"
                weight="medium"
                lead="tight"
                class="text-muted-800 dark:text-muted-100"
              >
                <span>{{ file.name }}</span>
              </BaseHeading>
              <BaseText size="xs" class="text-muted-400">
                <span>{{ file.type }}</span>
              </BaseText>
            </div>
            <div class="ms-auto">
              <BaseDropdown
                flavor="context"
                label="Dropdown"
                orientation="end"
                size="md"
                class="z-20"
                shape="curved"
              >
                <BaseDropdownItem
                  to="#"
                  title="Download"
                  text="Download this file"
                >
                  <template #start>
                    <Icon
                      name="ph:cloud-arrow-down-duotone"
                      class="me-2 block h-5 w-5"
                    />
                  </template>
                </BaseDropdownItem>
                <BaseDropdownItem
                  to="#"
                  title="Upload"
                  text="Upload a new version"
                >
                  <template #start>
                    <Icon
                      name="ph:cloud-arrow-up-duotone"
                      class="me-2 block h-5 w-5"
                    />
                  </template>
                </BaseDropdownItem>
                <BaseDropdownDivider />
                <BaseDropdownItem
                  to="#"
                  title="Permissions"
                  text="Manage permissions"
                >
                  <template #start>
                    <Icon name="ph:lock-duotone" class="me-2 block h-5 w-5" />
                  </template>
                </BaseDropdownItem>
                <BaseDropdownItem to="#" title="Share" text="Share this file">
                  <template #start>
                    <Icon name="ph:share-duotone" class="me-2 block h-5 w-5" />
                  </template>
                </BaseDropdownItem>
                <BaseDropdownDivider />
                <BaseDropdownItem to="#" title="Delete" text="Delete this file">
                  <template #start>
                    <Icon name="ph:trash-duotone" class="me-2 block h-5 w-5" />
                  </template>
                </BaseDropdownItem>
              </BaseDropdown>
            </div>
          </div>
        </div>
      </template>
      <template #tab-2>
        <div class="space-y-6">
          <div
            v-for="file in savedFiles"
            :key="file.id"
            class="flex items-center gap-2"
          >
            <img :src="file.icon" class="h-10 w-10" :alt="file.name" />
            <div>
              <BaseHeading
                as="h3"
                size="sm"
                weight="medium"
                lead="tight"
                class="text-muted-800 dark:text-muted-100"
              >
                <span>{{ file.name }}</span>
              </BaseHeading>
              <BaseText size="xs" class="text-muted-400">
                <span>{{ file.type }}</span>
              </BaseText>
            </div>
            <div class="ms-auto">
              <BaseDropdown
                flavor="context"
                label="Dropdown"
                orientation="end"
                size="md"
                shape="curved"
                class="z-20"
              >
                <BaseDropdownItem
                  to="#"
                  title="Download"
                  text="Download this file"
                >
                  <template #start>
                    <Icon
                      name="ph:cloud-arrow-down-duotone"
                      class="me-2 block h-5 w-5"
                    />
                  </template>
                </BaseDropdownItem>
                <BaseDropdownItem
                  to="#"
                  title="Upload"
                  text="Upload a new version"
                >
                  <template #start>
                    <Icon
                      name="ph:cloud-arrow-up-duotone"
                      class="me-2 block h-5 w-5"
                    />
                  </template>
                </BaseDropdownItem>
                <BaseDropdownDivider />
                <BaseDropdownItem
                  to="#"
                  title="Permissions"
                  text="Manage permissions"
                >
                  <template #start>
                    <Icon name="ph:lock-duotone" class="me-2 block h-5 w-5" />
                  </template>
                </BaseDropdownItem>
                <BaseDropdownItem to="#" title="Share" text="Share this file">
                  <template #start>
                    <Icon name="ph:share-duotone" class="me-2 block h-5 w-5" />
                  </template>
                </BaseDropdownItem>
                <BaseDropdownDivider />
                <BaseDropdownItem to="#" title="Delete" text="Delete this file">
                  <template #start>
                    <Icon name="ph:trash-duotone" class="me-2 block h-5 w-5" />
                  </template>
                </BaseDropdownItem>
              </BaseDropdown>
            </div>
          </div>
        </div>
      </template>
    </TabbedContent>
  </div>
</template>
