import {
  isBefore,
  setMonth,
  setYear,
  setDay,
  addMinutes,
  differenceInMinutes,
  roundToNearestMinutes,
} from 'date-fns'

import type {
  Awaitable,
  CalendarCustomAttribute,
  CalendarSettings,
  CalendarEvent,
} from '../types'

import { minutesToHeight, topToDate } from '../view'

export function useDragEvent(
  settings: CalendarSettings,
  calendarEvents: MaybeRefOrGetter<CalendarCustomAttribute<CalendarEvent>[]>,
  onDragEnd: (
    event: CalendarCustomAttribute<CalendarEvent>,
  ) => Awaitable<void> = () => {},
) {
  // event height dragging handler, changes end_date
  const isHeightDragging = ref(false)
  function onHeightDragStart(
    attr: CalendarCustomAttribute<CalendarEvent>,
    e: MouseEvent | TouchEvent,
  ) {
    if (isHeightDragging.value) {
      return
    }
    isHeightDragging.value = true

    document.documentElement.classList.add('cursor-n-resize')

    const onPointerMove = (e: PointerEvent) => {
      const targetDay = (e.target as HTMLElement)?.dataset?.day
      if (!targetDay) {
        return
      }

      const y = e.offsetY
      const dateClick = topToDate(settings, y, attr.customData.end_date)
      if (!dateClick) {
        return
      }
      const date = roundToNearestMinutes(dateClick, {
        nearestTo: settings.hourPrecision,
      })
      if (!attr.customData.end_date) {
        return
      }
      if (date === attr.customData.end_date) {
        return
      }
      if (isBefore(date, attr.customData.start_date)) {
        return
      }

      attr.customData.end_date = date
    }

    const onPointerUp = async (e: MouseEvent | TouchEvent) => {
      document.documentElement.removeEventListener('pointerup', onPointerUp)
      document.documentElement.removeEventListener('pointermove', onPointerMove)
      document.documentElement.classList.remove('cursor-n-resize')

      await onDragEnd(attr)

      setTimeout(() => {
        isHeightDragging.value = false
      }, 100)
    }

    document.documentElement.addEventListener('pointerup', onPointerUp, false)
    document.documentElement.addEventListener(
      'pointermove',
      onPointerMove,
      false,
    )
  }

  // event position dragging handler, changes start_date
  const isPositionDragging = ref(false)
  function onPositionDragStart(
    attr: CalendarCustomAttribute<CalendarEvent>,
    e: MouseEvent | TouchEvent,
  ) {
    if (isPositionDragging.value) {
      return
    }
    isPositionDragging.value = true

    document.documentElement.classList.add('cursor-grabbing')

    const onPointerMove = (e: PointerEvent) => {
      const targetDay = (e.target as HTMLElement)?.dataset?.day
      if (!targetDay) {
        return
      }
      const targetDayDate = new Date(targetDay)

      const y = e.offsetY - minutesToHeight(settings, 5)

      const dateClick = topToDate(settings, y, attr.customData.start_date)
      if (!dateClick) {
        return
      }
      const date = roundToNearestMinutes(dateClick, {
        nearestTo: settings.hourPrecision,
      })
      if (!attr.customData.start_date) {
        return
      }
      if (date !== attr.customData.start_date) {
        const diff = differenceInMinutes(
          attr.customData.end_date,
          attr.customData.start_date,
        )
        const start = setYear(
          setMonth(
            setDay(date, targetDayDate.getDay()),
            targetDayDate.getMonth(),
          ),
          targetDayDate.getFullYear(),
        )
        const end = addMinutes(start, diff)

        const calendarEventsValue = toValue(calendarEvents)
        const idx = calendarEventsValue.findIndex(
          (item) => item.customData.id === attr.customData.id,
        )
        calendarEventsValue[idx] = {
          ...calendarEventsValue[idx],
          customData: {
            ...calendarEventsValue[idx].customData,
            start_date: start,
            end_date: end,
          },
          dates: [start, end],
        }
      }
    }

    const onPointerUp = async (e: MouseEvent | TouchEvent) => {
      document.documentElement.removeEventListener('pointerup', onPointerUp)
      document.documentElement.removeEventListener('pointermove', onPointerMove)
      document.documentElement.classList.remove('cursor-grabbing')

      const calendarEventsValue = toValue(calendarEvents)
      const idx = calendarEventsValue.findIndex(
        (item) => item.customData.id === attr.customData.id,
      )

      if (idx !== -1) {
        await onDragEnd(attr)
      }

      setTimeout(() => {
        isPositionDragging.value = false
      }, 100)
    }

    document.documentElement.addEventListener('pointerup', onPointerUp, false)
    document.documentElement.addEventListener(
      'pointermove',
      onPointerMove,
      false,
    )
  }

  return {
    isHeightDragging,
    onHeightDragStart,

    isPositionDragging,
    onPositionDragStart,
  }
}
