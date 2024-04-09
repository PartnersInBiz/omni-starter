<script setup lang="ts">
/* TODO: Add the following:

AutocompleteItem
*/
const navigation = [
  {
    name: "Base Components",
    subsidebar: [
      {
        name: "Accordion",
        title: "Accordion",
        comp: "BaseAccordion",
        schema: {
          rounded: "sm",
          action: "chevron",
          items: [
            {
              title: "Accordion 1",
              content: "Hello World",
            },
            {
              title: "Accordion 2",
              content: "Hello World",
            },
          ],
          openItems: [0],
          exclusive: true,
        },
        slots: [
          {
            name: "AccordionItem",
            title: "Accordion 1",
            comp: "BaseAccordionItem",
            schema: {
              index: 0,
              item: {
                title: "Accordion 1",
                content: "Hello World",
              },
            },
          },
          {
            name: "AccordionItemSummary",
            title: "Accordion 1",
            comp: "BaseAccordionItemSummary",
            schema: {
              index: 0,
              item: {
                title: "Accordion 1",
                content: "Hello World",
              },
            },
          },
          {
            name: "AccordionItemContent",
            title: "Accordion 1",
            comp: "BaseAccordionItemContent",
            schema: {
              index: 0,
              item: {
                title: "Accordion 1",
                content: "Hello World",
              },
            },
          },
        ],
      },
      {
        name: "Autocomplete",
        title: "Autocomplete",
        comp: "BaseAutocomplete",
        schema: {
          rounded: "sm",
          size: "md",
          contrast: "muted",
          label: "AutoComplete",
          labelFloat: true,
          icon: "mdi:magnify",
          i18n: {
            pending: "Loading...",
            empty: "No results found",
          },
          placeholder: "Search",
          error: "This field is required",
          clearValue: "Clear",
          clearIcon: "mdi:close",
          chipClearIcon: "mdi:close",
          dropdownIcon: "mdi:chevron-down",
          // displayValue: "name",
          filterDebounce: 300,
          filterItems: [
            {
              name: "Hermann Mayer",
              photo: "/img/avatars/16.svg",
            },
            {
              name: "Kendra Wilson",
              photo: "/img/avatars/10.svg",
            },
          ],
          items: [
            {
              photo: "/img/avatars/16.svg",
              name: "Hermann Mayer",
            },
            {
              photo: "/img/avatars/10.svg",
              name: "Kendra Wilson",
            },
          ],
          classes: {
            wrapper: "w-full",
            label: "text-muted-500 dark:text-muted-400",
            input: "text-muted-800 dark:text-muted-100",
            icon: "text-muted-500 dark:text-muted-400",
          },
          allowClear: true,
          loading: false,
          disabled: false,
          clearable: true,
          dropdown: true,
          multiple: false,
          fixed: false,
          placement: "bottom-start",
          properties: {
            value: "name",
            label: "name",
            sublabel: "photo",
            media: "photo",
            icon: "photo",
          },
        },
      },
      {
        name: "Avatar",
        title: "Avatar",
        comp: "BaseAvatar",
        schema: {
          src: "/img/icons/logos/slicer.svg",
          srcDark: "/img/icons/logos/slicer.svg",
          badgeSrc: "/img/avatars/10.svg",
          text: "Hello World",
          size: "md",
          rounded: "none",
          mask: "hex",
          dot: true,
          ring: "primary",
        },
        slot: [],
      },
      {
        name: "Avatar Group",
        title: "Avatar Group",
        comp: "BaseAvatarGroup",
        schema: {
          limit: 3,
          size: "md",
          avatars: [
            {
              src: "/img/icons/logos/slicer.svg",
              srcDark: "/img/icons/logos/slicer.svg",
              badgeSrc: "/img/avatars/10.svg",
              text: "Hello World",
              size: "md",
              rounded: "none",
              mask: "hex",
              dot: true,
              ring: "primary",
            },
            {
              src: "/img/avatars/10.svg",
              srcDark: "/img/avatars/10.svg",
              badgeSrc: "/img/icons/logos/slicer.svg",
              text: "Hello World",
              size: "md",
              rounded: "none",
              mask: "hex",
              dot: true,
              ring: "primary",
            },
          ],
        },
        slot: [],
      },
      {
        name: "Breadcrumb",
        title: "Breadcrumb",
        comp: "BaseBreadcrumb",
        schema: {
          items: [
            {
              label: "Home",
              to: "/",
              hideLabel: true,
              icon: "mdi:home",
              iconClasses: "w-4 h-4",
            },
            {
              label: "Components",
              to: "/components",
              hideLabel: true,
              icon: "mdi:home",
              iconClasses: "w-4 h-4",
            },
            {
              label: "Breadcrumb",
            },
          ],
        },
      },
      {
        name: "Button",
        title: "Button",
        comp: "BaseButton",
        schema: {
          to: undefined,
          href: undefined,
          rel: "",
          target: "",
          type: undefined,
          size: "md",
          variant: undefined,
          color: "primary",
          rounded: "sm",
          shadow: undefined,
          innerText: "Button",
        },
        slots: [],
      },
      {
        name: "Button Action",
        title: "Button Action",
        comp: "BaseButtonAction",
        schema: {
          to: undefined,
          href: undefined,
          rel: "",
          target: "",
          type: undefined,
          size: "md",
          variant: undefined,
          color: "primary",
          rounded: "sm",
          shadow: undefined,
          innerText: "Button",
        },
        slots: [],
      },
      {
        name: "Button Close",
        comp: "BaseButtonClose",
        title: "Button Close",
        schema: {
          to: undefined,
          href: undefined,
          rel: "",
          target: "",
          type: undefined,
          size: "md",
          variant: undefined,
          color: "primary",
          rounded: "sm",
          shadow: undefined,
          innerText: "Button",
        },
        slots: [],
      },
      {
        name: "Button Group",
        comp: "BaseButtonGroup",
        title: "Button Group",
        schema: {},
        slots: [
          {
            name: "Button",
            comp: "BaseButton",
            schema: {
              to: undefined,
              href: undefined,
              rel: "",
              target: "",
              type: undefined,
              size: "md",
              variant: undefined,
              color: "primary",
              rounded: "sm",
              shadow: undefined,
              innerText: "Button",
            },
            slots: [],
          },
          {
            name: "Button Action",
            comp: "BaseButtonAction",
            title: "Button Action",
            schema: {
              to: undefined,
              href: undefined,
              rel: "",
              target: "",
              type: undefined,
              size: "md",
              variant: undefined,
              color: "primary",
              rounded: "sm",
              shadow: undefined,
              innerText: "",
            },
            slots: [],
          },
          {
            name: "Button Close",
            comp: "BaseButtonClose",
            schema: {
              to: undefined,
              href: undefined,
              rel: "",
              target: "",
              type: undefined,
              size: "md",
              variant: undefined,
              color: "primary",
              rounded: "sm",
              shadow: undefined,
              innerText: "",
            },
            slots: [],
          },
        ],
      },
      {
        name: "Button Icon",
        comp: "BaseButtonIcon",
        title: "Button Icon",
        schema: {
          to: undefined,
          href: undefined,
          rel: "",
          target: "",
          type: undefined,
          size: "md",
          variant: undefined,
          color: "primary",
          rounded: "sm",
          shadow: undefined,
          innerText: "",
        },
        slots: [
          {
            name: "Icon",
            comp: "BaseIcon",
            schema: {
              icon: "mdi:stadium-outline",
              class: "text-primary-500",
            },
            slots: [],
          },
        ],
      },
      {
        name: "Card",
        comp: "BaseCard",
        title: "Card",
        schema: {
          rounded: "sm",
          class: "p-3",
          color: "white",
          shadow: "flat",
        },
        slots: [
          {
            name: "Button",
            comp: "BaseButton",
            slot: "default",
            schema: {
              rounded: "sm",
              color: "primary",
              shadow: "flat",
              innerText: "Button",
            },
            slots: [],
          },
        ],
      },
      {
        name: "Icon",
        comp: "BaseIcon",
        title: "Icon",
        schema: {
          icon: "mdi:stadium-outline",
          class: "text-primary-500",
        },
        slots: [],
      },
      {
        name: "Dropdown",
        comp: "BaseDropdown",
        title: "Dropdown",
        schema: {
          variant: "button",
          buttonColor: "primary",
          color: "white",
          rounded: "sm",
          orientation: "start",
          placement: "bottom-start",
          size: "md",
          label: "Dropdown",
          headerLabel: "Dropdown",
          fixed: false,
        },
        slots: [],
      },
      {
        name: "Divider",
        title: "Divider",
        comp: "BaseDropdownDivider",
        schema: {},
        slots: [],
      },
      {
        name: "Dropdown Item",
        comp: "BaseDropdownItem",
        title: "Dropdown Item",
        schema: {
          to: undefined,
          href: undefined,
          rel: "",
          target: "",
          type: "button",
          rounded: "sm",
          color: "default",
          title: "Dropdown Item",
          text: "Dropdown Item",
          classes: {
            title:
              "font-heading text-muted-800 text-xs font-semibold leading-tight dark:text-white",
            text: "text-muted-400 font-sans text-xs",
          },
          disabled: false,
        },
        slots: [],
      },
      {
        name: "Flex Table",
        comp: "BaseFlexTable",
        title: "Flex Table",
        schema: {
          icon: "mdi:stadium-outline",
          class: "text-primary-500",
        },
        slots: [
          {
            name: "Icon",
            comp: "BaseIcon",
            slot: "header",
            title: "Icon",
            schema: {
              icon: "mdi:stadium-outline",
              class: "text-primary-500",
            },
            slots: [],
          },
          {
            name: "Icon",
            comp: "BaseIcon",
            slot: "footer",
            title: "Icon",
            schema: {
              icon: "mdi:stadium-outline",
              class: "text-primary-500",
            },
            slots: [],
          },
        ],
      },
      {
        name: "Flex Table Cell",
        comp: "BaseFlexTableCell",
        title: "Flex Table Cell",
        schema: {
          type: "stable",
        },
        slots: [
          {
            name: "Icon",
            comp: "BaseIcon",
            schema: {
              icon: "mdi:stadium-outline",
              class: "text-primary-500",
            },
            slots: [],
          },
        ],
      },
      {
        name: "Flex Table Heading",
        comp: "BaseFlexTableHeading",
        title: "Flex Table Heading",
        schema: {
          type: "stable",
        },
        slots: [
          {
            name: "Icon",
            comp: "BaseIcon",
            schema: {
              icon: "mdi:stadium-outline",
              class: "text-primary-500",
            },
            slots: [],
          },
        ],
      },
      {
        name: "Flex Table Row",
        comp: "BaseFlexTableRow",
        title: "Flex Table Row",
        schema: {
          shape: "rounded",
        },
        slots: [
          {
            name: "Icon",
            comp: "BaseIcon",
            schema: {
              icon: "mdi:stadium-outline",
              class: "text-primary-500",
            },
            slots: [],
          },
        ],
      },
      {
        name: "Focus Loop",
        comp: "BaseFocusLoop",
        title: "Focus Loop",
        schema: {
          as: "div",
          nextKeys: ["ArrowDown", "ArrowUp"],
          prevKeys: ["ArrowUp", "ArrowDown"],
          prevent: false,
        },
        slots: [],
      },
      {
        name: "Heading",
        comp: "BaseHeading",
        title: "Heading",
        schema: {
          as: "h1",
          size: "3xl",
          weight: "bold",
          lead: "tight",
        },
        slots: [],
      },
      {
        name: "Icon Box",
        comp: "BaseIconBox",
        title: "Icon Box",
        schema: {
          variant: "solid",
          color: "default",
          size: "sm",
          rounded: "md",
          mask: "hex",
          bordered: false,
        },
        slots: [],
      },
      {
        name: "Image Gallery",
        comp: "BaseImageGallery",
        title: "Image Gallery",
        schema: {
          photos: [],
        },
        slots: [],
      },
      {
        name: "KBD",
        comp: "BaseKbd",
        title: "KBD",
        schema: {
          rounded: "none",
          size: "md",
          color: "default",
          icon: "mdi:stadium-outline",
          classes: {
            wrapper: "w-full",
          },
        },
        slots: [],
      },
      {
        name: "Link",
        comp: "BaseLink",
        title: "Link",
        schema: {
          to: undefined,
          href: undefined,
          rel: "",
          target: "",
          type: undefined,
          size: "md",
          variant: undefined,
          color: "primary",
          rounded: "sm",
          shadow: undefined,
          innerText: "Link",
        },
        slots: [
          {
            name: "Icon",
            comp: "BaseIcon",
            schema: {
              icon: "mdi:stadium-outline",
              class: "text-primary-500",
            },
            slots: [],
          },
        ],
      },

      {
        name: "List",
        comp: "BaseList",
        title: "List",
        schema: {
          ordered: false,
          media: false,
        },
        slots: [
          {
            name: "ListItem",
            comp: "BaseListItem",
            title: "List Item",
            schema: {
              to: undefined,
              href: undefined,
              rel: "",
              target: "",
              type: undefined,
              size: "md",
              variant: undefined,
              color: "primary",
              rounded: "sm",
              shadow: undefined,
              innerText: "Link",
            },
            slots: [
              {
                name: "Icon",
                comp: "BaseIcon",
                title: "Icon",
                schema: {
                  icon: "mdi:stadium-outline",
                  class: "text-primary-500",
                },
                slots: [],
              },
            ],
          },
        ],
      },

      {
        name: "List Box",
        comp: "BaseListBox",
        title: "List Box",
        schema: {
          items: [
            {
              title: "List Box 1",
              content: "Hello World",
            },
            {
              title: "List Box 2",
              content: "Hello World",
            },
          ],
          rounded: "sm",
          size: "md",
          contrast: "muted",
          label: "List Box",
          labelFloat: true,
          icon: "mdi:magnify",
          selectionIcon: "mdi:check",
          placeholder: "Search",
          error: "This field is required",
          loading: false,
          disabled: false,
          multiple: false,
          multipleLabel: "Selected",
          fixed: false,
          placement: "bottom-start",
          properties: {
            value: "title",
            label: "title",
            sublabel: "content",
            media: "content",
            icon: "content",
          },
          slots: [],
        },
      },

      {
        name: "Listbox Item",
        comp: "BaseListboxItem",
        title: "Listbox Item",
        schema: {
          value: {
            value: "List Box 1",
            label: "List Box 1",
            sublabel: "Hello World",
            media: "/img/avatars/10.svg",
            icon: "mdi:stadium-outline",
          },
          selectedIcon: "lucide:check",
          active: false,
          selected: false,
        },
        slots: [],
      },

      {
        name: "List Item",
        comp: "BaseListItem",
        title: "List Item",
        schema: {
          title: "List Box 1",
          subtitle: "Hello World",
        },
        slots: [],
      },

      {
        name: "Logo",
        comp: "BaseLogo",
        title: "Logo",
        schema: {
          size: "md",
          src: "/img/icons/logos/slicer.svg",
          name: "Slicer",
        },
        slots: [],
      },

      {
        name: "Message",
        title: "Message",
        comp: "BaseMessage",
        schema: {
          type: "default",
          rounded: "sm",
          message: "",
          icon: false,
          closeIcon: "lucide:x",
          closable: false,
        },
        slots: [],
      },

      {
        name: "Pagination",
        comp: "BasePagination",
        title: "Pagination",
        schema: {
          rounded: "none",
          itemPerPage: 10,
          totalItems: 100,
          currentPage: 1,
          noRouter: false,
          maxLinksDisplayed: 3,
          routerQueryKey: "page",
          previousIcon: "lucide:chevron-left",
          nextIcon: "lucide:chevron-right",
          ellipsis: "...",
        },
        slots: [],
      },

      {
        name: "Paragraph",
        comp: "BaseParagraph",
        title: "Paragraph",
        schema: {
          as: "p",
          size: "md",
          weight: "normal",
          lead: "normal",
        },
        slots: [],
      },

      {
        name: "Placeholder Page",
        comp: "BasePlaceholderPage",
        title: "Placeholder Page",
        schema: {
          title: "Placeholder",
          subtitle: "Hello World",
          imageSize: "md",
        },
        slots: [],
      },

      {
        name: "Placeload",
        comp: "BasePlaceload",
        title: "Placeload",
        schema: {},
        slots: [],
      },

      {
        name: "Progress",
        comp: "BaseProgress",
        title: "Progress",
        schema: {
          size: "md",
          contrast: "default",
          color: "primary",
          rounded: "none",
          value: 50,
          max: 100,
        },
        slots: [],
      },

      {
        name: "Progress Circle",
        comp: "BaseProgressCircle",
        title: "Progress Circle",
        schema: {
          value: 50,
          max: 100,
          size: "md",
          thickness: 3,
          animation: true,
        },
        slots: [],
      },

      {
        name: "Prose",
        comp: "BaseProse",
        title: "Prose",
        schema: {
          rounded: "none",
        },
        slots: [],
      },

      {
        name: "Snack",
        comp: "BaseSnack",
        title: "Snack",
        schema: {
          size: "md",
          color: "default",
          label: "Hello World",
          icon: "lucide:check",
          image: "/img/avatars/10.svg",
        },
        slots: [],
      },

      {
        name: "Table",
        comp: "BaseTable",
        title: "Table",
        schema: {
          xlsxData: [],
        },
        slots: [],
      },

      {
        name: "Tabs",
        comp: "BaseTabs",
        title: "Tabs",
        schema: {
          type: "tabs",
          justify: "center",
          tabs: [
            {
              label: "Tab 1",
              value: "tab1",
              icon: "mdi:home",
            },
          ],
        },
        slots: [],
      },

      {
        name: "Tab Slider",
        comp: "BaseTabSlider",
        title: "Tab Slider",
        schema: {
          justify: "center",
          size: "md",
          rounded: "none",
          tabs: [
            {
              label: "Tab 1",
              value: "tab1",
            },
          ],
        },
        slots: [],
      },

      {
        name: "Tag",
        comp: "BaseTag",
        title: "Tag",
        schema: {
          variant: "solid",
          color: "default",
          rounded: "md",
          size: "md",
          shadow: "flat",
        },
        slots: [],
      },

      {
        name: "Tags",
        comp: "BaseTags",
        title: "Tags",
        schema: {
          multiple: true,
          icon: "mdi:home",
          shape: "rounded",
          label: "Tags",
          placeholder: "Search",
        },
        slots: [],
      },

      {
        name: "Text",
        comp: "BaseText",
        title: "Text",
        schema: {
          size: "md",
          weight: "normal",
          lead: "normal",
        },
        slots: [],
      },

      {
        name: "Textarea",
        comp: "BaseTextarea",
        title: "Textarea",
        schema: {
          id: "textarea",
          name: "textarea",
          rounded: "sm",
          size: "md",
          contrast: "muted",
          label: "Textarea",
          labelFloat: true,
          placeholder: "Search",
          colorFocus: true,
          loading: false,
          disabled: false,
          readonly: false,
          error: "This field is required",
          addon: "w-full",
          rows: 3,
          resize: true,
          autogrow: true,
          maxH: 100,
          classes: {
            wrapper: "w-full",
            label: "text-muted-500 dark:text-muted-400",
            textarea: "text-muted-800 dark:text-muted-100",
            addon: "w-full",
            error: "text-red-500",
          },
        },
        slots: [],
      },

      {
        name: "Theme Switch",
        title: "Theme Switch",
        comp: "BaseThemeSwitch",
        schema: {
          disableTransitions: false,
        },
        slots: [],
      },

      {
        name: "Theme Toggle",
        comp: "BaseThemeToggle",
        title: "Theme Toggle",
        schema: {
          disableTransitions: false,
          inverted: false,
        },
        slots: [],
      },

      {
        name: "Tree Select",
        comp: "BaseTreeSelect",
        title: "Tree Select",
        schema: {
          children: [],
          icons: {
            open: "mdi:chevron-down",
            closed: "mdi:chevron-right",
            item: "mdi:stadium-outline",
            pending: "mdi:loading",
            empty: "mdi:close",
          },
          treeline: true,
          i18n: {
            pending: "Loading...",
            empty: "No results found",
          },
          classes: {
            pendingIcon: "text-primary-500",
            emptyIcon: "text-red-500",
            treeIcon: "text-muted-500 dark:text-muted-400",
            itemIcon: "text-primary-500",
            treeline: "text-muted-500 dark:text-muted-400",
            checkbox: "text-primary-500",
          },
          level: 0,
          parent: null,
        },
        slots: [],
      },

      {
        name: "Treeselect Item",
        comp: "BaseTreeSelectItem",
        title: "Treeselect Item",
        schema: {
          value: {
            name: "Tree Select 1",
            text: "Hello World",
            media: "/img/avatars/10.svg",
            icon: "mdi:stadium-outline",
          },
          level: 1,
          toggle: undefined,
          rounded: "md",
        },
        slots: [],
      },
    ],
  },
  {
    name: "Base Form Components",
    subsidebar: [
      {
        name: "Checkbox",
        comp: "BaseCheckbox",
        title: "Checkbox",
        schema: {
          value: "",
          trueValue: true,
          falseValue: false,
          id: "checkbox",
          label: "Checkbox",
          error: "",
          disabled: false,
          indeterminate: false,
          rounded: "sm",
          color: "primary",
          classes: {
            wrapper: "w-full",
            label: "text-muted-500 dark:text-muted-400",
            input: "text-primary-500",
          },
        },
        slots: [],
      },
      {
        name: "Checkbox Animated",
        comp: "BaseCheckboxAnimated",
        title: "Checkbox Animated",
        schema: {
          value: "",
          trueValue: true,
          falseValue: false,
          id: "checkbox",
          label: "Checkbox",
          error: "",
          disabled: false,
          indeterminate: false,
          rounded: "sm",
          color: "primary",
          classes: {
            wrapper: "w-full",
            label: "text-muted-500 dark:text-muted-400",
            input: "text-primary-500",
          },
        },
        slots: [],
      },
      {
        name: "Checkbox headless",
        comp: "BaseCheckboxHeadless",
        title: "Checkbox headless",
        schema: {
          value: "",
          trueValue: true,
          falseValue: false,
          id: "checkbox",
          label: "Checkbox",
          error: "",
          disabled: false,
          indeterminate: false,
          rounded: "sm",
          color: "primary",
          classes: {
            wrapper: "w-full",
            label: "text-muted-500 dark:text-muted-400",
            input: "text-primary-500",
          },
        },
        slots: [],
      },
      {
        name: "Country Select",
        comp: "BaseCountrySelect",
        title: "Country Select",
        schema: {
          value: "",
          id: "CountrySelect",
          label: "Checkbox",
          country: "South Africa",
          countryFull: {
            name: "South Africa",
            image: "/img/flags/south-africa.svg",
          },
          error: "",
          disabled: false,
          indeterminate: false,
          rounded: "sm",
          color: "primary",
          classes: {
            wrapper: "w-full",
            label: "text-muted-500 dark:text-muted-400",
            input: "text-primary-500",
          },
        },
        slots: [],
      },
      {
        name: "Datepicker",
        comp: "BaseDatepicker",
        title: "Datepicker",
        schema: {
          value: "",
          id: "CountrySelect",
          expanded: false,
        },
        slots: [],
      },
      {
        name: "Fullscreen Dropfile",
        comp: "BaseFullscreenDropfile",
        title: "Fullscreen Dropfile",
        schema: {
          icon: "mdi:stadium-outline",
          label: "Fullscreen Dropfile",
          filterFileDropped: true,
        },
        slots: [],
      },
      {
        name: "Input",
        comp: "BaseInput",
        title: "Input",
        schema: {
          id: "input",
          type: "text",
          rounded: "sm",
          size: "md",
          contrast: "muted",
          label: "Input",
          labelFloat: true,
          icon: "mdi:magnify",
          placeholder: "Search",
          error: "This field is required",
          colorFocus: true,
          loading: false,
          classes: {
            wrapper: "w-full",
            label: "text-muted-500 dark:text-muted-400",
            input: "text-muted-800 dark:text-muted-100",
            icon: "text-muted-500 dark:text-muted-400",
            outer: "w-full",
            addon: "w-full",
            error: "text-red-500",
          },
        },
        slots: [],
      },
      {
        name: "InputFile",
        comp: "BaseInputFile",
        title: "InputFile",
        schema: {
          id: "input",
          rounded: "sm",
          size: "md",
          contrast: "muted",
          label: "Input",
          icon: "mdi:magnify",
          placeholder: "Search",
          error: "This field is required",
          colorFocus: true,
          loading: false,
          textValue: (value: string) => {
            return value;
          },
          classes: {
            wrapper: "w-full",
            label: "text-muted-500 dark:text-muted-400",
            input: "text-muted-800 dark:text-muted-100",
            icon: "text-muted-500 dark:text-muted-400",
            outer: "w-full",
            addon: "w-full",
            error: "text-red-500",
          },
        },
        slots: [],
      },
      {
        name: "Inputfile Headless",
        comp: "BaseInputFileHeadless",
        title: "Inputfile Headless",
        schema: {
          id: "input",
          multiple: true,
          filterFileDropped: true,
        },
        slots: [],
      },
      {
        name: "Industry Select",
        comp: "BaseIndustrySelect",
        title: "Industry Select",
        schema: {
          default: "Agriculture",
          label: "Industry",
          classes: {
            wrapper: "w-full",
            label: "text-muted-500 dark:text-muted-400",
            input: "text-muted-800 dark:text-muted-100",
            icon: "text-muted-500 dark:text-muted-400",
            outer: "w-full",
            addon: "w-full",
            error: "text-red-500",
          },
        },
        slots: [],
      },

      {
        name: "Mobile",
        comp: "BaseMobile",
        title: "Mobile",
        schema: {
          title: "Mobile",
          subtitle: "Hello World",
        },
        slots: [],
      },

      {
        name: "Radio",
        comp: "BaseRadio",
        title: "Radio",
        schema: {
          value: "",
          id: "radio",
          label: "Radio",
          color: "primary",
          error: "",
          classes: {
            wrapper: "w-full",
            label: "text-muted-500 dark:text-muted-400",
            inputDot: "text-primary-500",
            inputBg: "text-primary-500",
          },
        },
        slots: [],
      },

      {
        name: "Radio Headless",
        comp: "BaseRadioHeadless",
        title: "Radio Headless",
        schema: {
          value: "",
          id: "radio",
          name: "radio",
          label: "Radio",
        },
        slots: [],
      },

      {
        name: "Select",
        comp: "BaseSelect",
        title: "Select",
        schema: {
          id: "select",
          rounded: "sm",
          size: "md",
          contrast: "muted",
          label: "Select",
          labelFloat: true,
          icon: "mdi:magnify",
          placeholder: "Search",
          loading: false,
          disabled: false,
          error: "This field is required",
          classes: {
            wrapper: "w-full",
            label: "text-muted-500 dark:text-muted-400",
            select: "text-muted-800 dark:text-muted-100",
            chevron: "text-muted-500 dark:text-muted-400",
            icon: "text-muted-500 dark:text-muted-400",
            error: "text-red-500",
          },
        },
        slots: [],
      },

      {
        name: "Switch Ball",
        comp: "BaseSwitchBall",
        title: "Switch Ball",
        schema: {
          id: "switch",
          label: "Switch",
          sublabel: "Hello World",
          color: "primary",
        },
        slots: [],
      },

      {
        name: "Switch Thin",
        comp: "BaseSwitchThin",
        title: "Switch Thin",
        schema: {
          id: "switch",
          label: "Switch",
          sublabel: "Hello World",
          color: "primary",
        },
        slots: [],
      },
    ],
  },
  /*
    {
      title: 'Basic',
      component: 'builder-grid-basic',
    },
    {
      title: 'Auto',
      component: 'builder-grid-auto-column-width',
    },
    {
      title: 'Column Order',
      component: 'builder-grid-column-order',
    },
    {
      title: 'Column Spacing',
      component: 'builder-grid-column-spacing',
    },
    {
      title: 'Mixed Column Sizes',
      component: 'builder-grid-mixed-column-sizes',
    },
    {
      title: 'Responsive Grids',
      component: 'builder-grid-responsive-grids',
    },
    {
      title: 'Simple Offset',
      component: 'builder-grid-simple-offset',
    },
    {
      title: 'Wrapping Columns',
      component: 'builder-grid-wrapping-columns',
    },
  */
  {
    name: "Grid",
    subsidebarclean: [
      {
        name: "Basic",
        icon: { name: "mdi:stadium-outline", class: "w-5 h-5" },
        activePath: "/builders",
        comp: "BuilderGridBasic",
      },
      {
        name: "Auto",
        icon: { name: "mdi:stadium-outline", class: "w-5 h-5" },
        activePath: "/builders",
        comp: "BuilderGridAutoColumnWidth",
      },
      {
        name: "Column Order",
        icon: { name: "mdi:stadium-outline", class: "w-5 h-5" },
        activePath: "/builders",
        comp: "BuilderGridColumnOrder",
      },
      {
        name: "Column Spacing",
        icon: { name: "mdi:stadium-outline", class: "w-5 h-5" },
        activePath: "/builders",
        comp: "BuilderGridColumnSpacing",
      },
      {
        name: "Mixed Column Sizes",
        icon: { name: "mdi:stadium-outline", class: "w-5 h-5" },
        activePath: "/builders",
        comp: "BuilderGridMixedColumnSizes",
      },
      {
        name: "Responsive Grids",
        icon: { name: "mdi:stadium-outline", class: "w-5 h-5" },
        activePath: "/builders",
        comp: "BuilderGridResponsiveGrids",
      },
      {
        name: "Simple Offset",
        icon: { name: "mdi:stadium-outline", class: "w-5 h-5" },
        activePath: "/builders",
        comp: "BuilderGridSimpleOffset",
      },
      {
        name: "Wrapping Columns",
        icon: { name: "mdi:stadium-outline", class: "w-5 h-5" },
        activePath: "/builders",
        comp: "BuilderGridWrappingColumns",
      },
    ],
  },
  {
    name: "Widgets",
    subsidebarclean: [
      {
        name: "Creative",
        icon: { name: "mdi:stadium-outline", class: "w-5 h-5" },
        activePath: "/builders",
        comp: "BuilderAppComponentsAddWidgetsCreative",
      },
      {
        name: "Ui",
        icon: { name: "mdi:stadium-outline", class: "w-5 h-5" },
        activePath: "/builders",
        comp: "BuilderAppComponentsAddWidgetsUi",
      },
      {
        name: "Lists",
        icon: { name: "mdi:stadium-outline", class: "w-5 h-5" },
        activePath: "/builders",
        comp: "BuilderAppComponentsAddWidgetsList",
      },
    ]
  }
  // {
  //   name: "Weather",
  //   subsidebar: [
  //     {
  //       name: "Builder",
  //       icon: { name: "mdi:stadium-outline", class: "w-5 h-5" },
  //       activePath: "/builders",
  //       component: "BaseButton",
  //     },
  //   ],
  // },
];
</script>

<template>
  <Subsidebar>
    <template #header>
      <SubsidebarHeader />
    </template>

    <SubsidebarMenu :navigation="navigation" />
  </Subsidebar>
</template>
