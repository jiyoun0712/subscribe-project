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
    id: uniqueId(),
    title: "기도",
    icon: IconAperture,
    href: "/apps/my/gallery",
  },
  {
    id: uniqueId(),
    title: "구독",
    icon: IconAperture,
    href: "/subscript",
  },
  {
    navlabel: true,
    subheader: "내 기도",
  },
  {
    id: uniqueId(),
    title: "최근 기도",
    icon: IconUserPlus,
    href: "/apps/my/new",
    chip: "New",
    chipColor: "secondary",
  },
  {
    id: uniqueId(),
    title: "기도 목록",
    icon: IconNotes,
    href: "/apps/my/prayerlist",
  },
  {
    navlabel: true,
    subheader: "구독",
  },
  {
    id: uniqueId(),
    title: "갓피플교회",
    icon: IconPackage,
    chip: "2",
    chipColor: "secondary",
    href: "/apps/contacts",
  },
  {
    id: uniqueId(),
    title: "믿음의교회",
    icon: IconPackage,
    chip: "2",
    chipColor: "secondary",
    href: "/apps/contacts",
  },
  {
    navlabel: true,
    subheader: "더보기",
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
        href: "/apps/blog/detail/10",
      },
    ],
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
    title: "설정",
    icon: IconSettings,
    href: "/apps/settings",
  },
 
];

export default Menuitems;
