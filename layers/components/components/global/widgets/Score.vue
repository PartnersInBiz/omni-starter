<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    text?: string
    class: string
    value?: number
    item_id: string
    shape?: 'straight' | 'rounded' | 'curved'
  }>(),
  {
    value: 0,
    title: undefined,
    text: undefined,
    shape: 'rounded',
  },
)

const gaugePersonal = reactive(useGaugePersonal())

function useGaugePersonal() {
  const { primary } = useTailwindColors()
  const type = 'radialBar'
  const height = 220

  const options = {
    title: {
      text: undefined,
    },
    chart: {
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    colors: [primary.value],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#e7e7e7',
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: false,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2,
          },
        },
        hollow: {
          margin: 0,
          size: '35%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: '22px',
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 0.1,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ['Average Results'],
  }

  const series = ref([props.value ?? 0])

  return {
    type,
    height,
    options,
    series,
  }
}

const classes = computed(() => {
  return props.class
})

</script>

<template>
  <BaseCard :shape="shape" :class="classes" :id="item_id">
    <div class="mb-6 flex items-center justify-between">
      <BaseHeading
        as="h3"
        size="sm"
        weight="semibold"
        lead="tight"
        class="text-muted-800 dark:text-white"
      >
        <span>{{ title }}</span>
      </BaseHeading>
    </div>
    <div class="py-16">
      <AddonApexcharts v-bind="gaugePersonal" class="-mt-14" />
    </div>
    <div class="mt-auto text-center">
      <BaseParagraph size="sm">
        <span class="text-muted-400">
          {{ text }}
        </span>
      </BaseParagraph>
    </div>
  </BaseCard>
</template>