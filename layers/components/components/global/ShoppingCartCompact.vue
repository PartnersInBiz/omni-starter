<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: "straight" | "rounded" | "curved" | "full";
    products: Array<{
      id: number;
      name: string;
      image: string;
      price: number;
      quantity: number;
    }>;
  }>(),
  {
    shape: "rounded",
  }
);
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <BaseHeading as="h3" size="md" weight="semibold" lead="tight">
        Shopping cart
      </BaseHeading>
      <BaseTag color="primary" size="sm" shape="full">3 items</BaseTag>
    </div>
    <div class="space-y-2">
      <div v-for="product in products" :key="product.id" class="flex gap-2">
        <div
          class="bg-muted-100 dark:bg-muted-700 flex h-16 w-16 shrink-0 items-center justify-center"
          :class="[
            props.shape === 'rounded' ? 'rounded' : '',
            props.shape === 'curved' ? 'rounded-xl' : '',
            props.shape === 'full' ? 'rounded-full' : '',
          ]"
        >
          <img
            class="h-12 w-12 object-cover object-center"
            :src="product.image"
            alt="Widget image"
          />
        </div>
        <div>
          <p class="text-muted-500 dark:text-muted-400 mt-1 font-sans text-xs">
            {{ product.name }}
          </p>
          <p class="font-sans font-semibold">${{ product.price }}</p>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <BaseButton color="primary" :shape="props.shape" class="!h-12 w-full">
        Checkout
      </BaseButton>
    </div>
  </div>
</template>
