<script setup lang="ts">
const authors = [
  {
    id: 0,
    first_name: "Hermann",
    last_name: "Mayer",
    image: "/img/avatars/16.svg",
    text: "HM",
    role: "Project manager",
    articles: 39,
  },
  {
    id: 1,
    first_name: "Sara",
    last_name: "Connor",
    image: "/img/avatars/12.svg",
    text: "SC",
    role: "Frontend developer",
    articles: 24,
  },
  {
    id: 2,
    first_name: "Kendra",
    last_name: "Wilson",
    image: "/img/avatars/10.svg",
    text: "KW",
    role: "HR manager",
    articles: 17,
  },
  {
    id: 3,
    first_name: "John",
    last_name: "Baxter",
    image: "/img/avatars/13.svg",
    text: "NL",
    role: "Business analyst",
    articles: 11,
  },
];
</script>

<template>
  <div class="mb-2 space-y-5">
    <div
      v-for="author in authors"
      :key="author.id"
      class="flex items-center gap-3"
    >
      <BaseAvatar
        :src="author.image"
        :text="author.text"
        shape="straight"
        mask="blob"
        class="bg-primary-100 dark:bg-primary-500/20 text-primary-500 shrink-0"
      />
      <div>
        <BaseHeading
          as="h4"
          size="sm"
          weight="light"
          lead="tight"
          class="text-muted-800 dark:text-white"
        >
          <span
            >{{ author.first_name }} {{ author.last_name.slice(0, 1) }}.</span
          >
        </BaseHeading>
        <BaseParagraph size="xs">
          <span class="text-muted-400">
            {{ author.role }}
          </span>
        </BaseParagraph>
      </div>
      <div class="ms-auto flex items-center gap-1">
        <span class="text-muted-400 font-sans text-xs">
          {{ author.articles }} articles
        </span>
        <BaseButtonIcon shape="curved" muted class="scale-75">
          <Icon name="lucide:arrow-right" class="h-4 w-4" />
        </BaseButtonIcon>
      </div>
    </div>
  </div>
</template>
