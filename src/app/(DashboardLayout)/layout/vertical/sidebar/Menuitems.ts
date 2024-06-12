import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconAlertCircle,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconEdit,
  IconGitMerge,
  IconCurrencyDollar,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartLine,
  IconChartArcs,
  IconChartCandle,
  IconChartArea,
  IconChartDots,
  IconChartDonut3,
  IconChartRadar,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconSettings,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconLockAccess,
  IconAppWindow,
} from "@tabler/icons-react";

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "첫화면",
    icon: IconAperture,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "시리즈",
  },

  {
    id: uniqueId(),
    title: "시리즈로 보기",
    icon: IconUserPlus,
    href: "/dashboards/ecommerce",
    chip: "New",
    chipColor: "secondary",
  },
  {
    id: uniqueId(),
    title: "아티클만 보기",
    icon: IconAlertCircle,
    href: "/dashboards/ecommerce",
  },
  {
    id: uniqueId(),
    title: "비디오만 보기",
    icon: IconShoppingCart,
    href: "/dashboards/ecommerce",
  },
  {
    navlabel: true,
    subheader: "세미나",
  },
  {
    id: uniqueId(),
    title: "Contacts",
    icon: IconPackage,
    chip: "2",
    chipColor: "secondary",
    href: "/apps/contacts",
  },
  {
    navlabel: true,
    subheader: "톡",
  },
  {
    id: uniqueId(),
    title: "Blog",
    icon: IconChartDonut3,
    href: "/apps/blog/",
    children: [
      {
        id: uniqueId(),
        title: "Posts",
        icon: IconPoint,
        href: "/apps/blog/post",
      },
      {
        id: uniqueId(),
        title: "Detail",
        icon: IconPoint,
        href: "/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Notes",
    icon: IconNotes,
    href: "/apps/notes",
  },
  {
    id: uniqueId(),
    title: "Calendar",
    icon: IconCalendar,
    href: "/apps/calendar",
  },
  {
    id: uniqueId(),
    title: "Email",
    icon: IconMail,
    href: "/apps/email",
    chip: "outline",
    variant: "outlined",
    chipColor: "primary",
  },
  {
    id: uniqueId(),
    title: "Tickets",
    icon: IconTicket,
    href: "/apps/tickets",
  },
 
];

export default Menuitems;
