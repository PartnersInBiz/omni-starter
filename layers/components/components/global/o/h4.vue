<script setup lang="ts">
const divPropsLive = withDefaults(
  defineProps<{
    item_id: string;
    /**
     * The size of the text.
     *
     * @default 'md'
     */
    size?:
      | "xs"
      | "sm"
      | "md"
      | "lg"
      | "xl"
      | "2xl"
      | "3xl"
      | "4xl"
      | "5xl"
      | "6xl"
      | "7xl"
      | "8xl"
      | "9xl";

    /**
     * The weight of the text.
     *
     * @default 'normal'
     */
    weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";

    /**
     * The lead of the text.
     *
     * @default 'normal'
     */
    lead?: "none" | "tight" | "snug" | "normal" | "relaxed" | "loose";
    class: string;
    innerText: string;
  }>(),
  {
    size: undefined,
    weight: undefined,
    lead: undefined,
  }
);

const size = useNuiDefaultProperty(divPropsLive, "BaseText", "size");
const weight = useNuiDefaultProperty(divPropsLive, "BaseText", "weight");
const lead = useNuiDefaultProperty(divPropsLive, "BaseText", "lead");

const sizes = {
  xs: "nui-content-xs",
  sm: "nui-content-sm",
  md: "nui-content-md",
  lg: "nui-content-lg",
  xl: "nui-content-xl",
  "2xl": "nui-content-2xl",
  "3xl": "nui-content-3xl",
  "4xl": "nui-content-4xl",
  "5xl": "nui-content-5xl",
  "6xl": "nui-content-6xl",
  "7xl": "nui-content-7xl",
  "8xl": "nui-content-8xl",
  "9xl": "nui-content-9xl",
} as Record<string, string>;

const weights = {
  light: "nui-weight-light",
  normal: "nui-weight-normal",
  medium: "nui-weight-medium",
  semibold: "nui-weight-semibold",
  bold: "nui-weight-bold",
  extrabold: "nui-weight-extrabold",
} as Record<string, string>;

const leads = {
  none: "nui-lead-none",
  tight: "nui-lead-tight",
  snug: "nui-lead-snug",
  normal: "nui-lead-normal",
  relaxed: "nui-lead-relaxed",
  loose: "nui-lead-loose",
} as Record<string, string>;

const classes = computed(() => [
  "nui-text",
  size.value && sizes[size.value],
  weight.value && weights[weight.value],
  lead.value && leads[lead.value],
  divPropsLive.class,
]);

const isEditAppState = useState("isEditAppState", () => {
  return false;
});


</script>

<template>
  <h4 :class="classes" :id="item_id">
    {{ innerText }}
  </h4>
</template>
