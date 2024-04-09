<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: "straight" | "rounded" | "curved" | "full";
    members: {
      id: number;
      first_name: string;
      last_name: string;
      image: string;
      text: string;
      role: string;
    }[];
  }>(),
  {
    shape: "rounded",
  }
);

const filter = ref("");

const filteredMembers = computed(() => {
  if (!filter.value) {
    return props.members;
  }
  const filterRe = new RegExp(filter.value, "i");
  return props.members.filter((item: any) => {
    return [item.first_name, item.last_name, item.role].some((item) =>
      item.match(filterRe)
    );
  });
});
</script>

<template>
  <div class="mb-2 space-y-1">
    <div class="relative mb-4">
      <BaseInput
        v-model="filter"
        icon="lucide:search"
        placeholder="Search team members..."
        :shape="props.shape"
      />
    </div>
    <div v-if="filteredMembers.length === 0">
      <div class="flex flex-col items-center py-10 text-center">
        <Icon name="pepicons-print:person" class="text-primary-500 h-10 w-10" />
        <BaseHeading as="h4" size="md" weight="medium" lead="tight">
          <span>No matching results</span>
        </BaseHeading>
        <BaseParagraph size="xs" class="text-muted-400 mx-auto max-w-[240px]">
          <span>
            Looks like we couldn't find any matchig results. Try different
            search terms.
          </span>
        </BaseParagraph>
      </div>
    </div>
    <div v-else>
      <div
        v-for="member in filteredMembers"
        :key="member.id"
        class="hover:bg-muted-100 focus-within:bg-muted-100 dark:hover:bg-muted-700/70 dark:focus-within:bg-muted-700/70 group flex items-center gap-3 p-2"
        :class="[
          props.shape === 'rounded' ? 'rounded-md' : '',
          props.shape === 'curved' ? 'rounded-xl' : '',
          props.shape === 'full' ? 'rounded-full' : '',
        ]"
      >
        <BaseAvatar
          :src="member.image"
          :text="member.text"
          size="xs"
          class="bg-primary-100 dark:bg-primary-500/20 text-primary-500 ms-1 shrink-0"
        />
        <div>
          <BaseHeading
            as="h4"
            size="xs"
            weight="light"
            lead="tight"
            class="text-muted-800 dark:text-white"
          >
            <span>
              {{ member.first_name }} {{ member.last_name.slice(0, 1) }}.
            </span>
          </BaseHeading>
          <BaseParagraph size="xs">
            <span class="text-muted-400">
              {{ member.role }}
            </span>
          </BaseParagraph>
        </div>
        <div
          class="ms-auto flex -translate-x-1 items-center opacity-0 transition-all duration-300 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100"
        >
          <BaseButtonIcon to="#" :shape="props.shape" muted class="scale-75">
            <Icon name="lucide:arrow-right" class="h-4 w-4" />
          </BaseButtonIcon>
        </div>
      </div>
    </div>
  </div>
</template>
