<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /**
     * The items to display in the component.
     */
    shape?: 'curved' | 'rounded' | 'square'
    /**
     * The image to display in the component.
     */
    image?: string
    /**
     * The badge small to display in the component.
     */
    badgeSmall?: string
    /**
     * The badge medium to display in the component.
     */
    badgeMedium?: string
    /**
     * The title to display in the component.
     */
    title?: string
    /**
     * The text to display in the component.
     */
    text?: string

    item_id: string
    class?: string
  }>(),
  {
    shape: 'rounded',
    image: '',
    badgeSmall: '',
    badgeMedium: '',
    title: '',
    text: '',
    class: '',
  },
)

const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <InfoBadges
      :image="image"
      :badge-small="badgeSmall"
      :badge-medium="badgeMedium"
      :title="title"
      :text="text"
    />
  </BaseCard>
</template>