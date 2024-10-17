import React from "react";

import Link from "next/link";

// mui imports
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import { useSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";
import { AppState } from "@/store/store";



type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: any;
  children?: NavGroup[];
  chip?: string;
  chipColor?: any;
  variant?: string | any;
  external?: boolean;
  level?: number;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: any;
  level?: number | any;
  pathDirect: string;
}

export default function NavItem({
  item,
  level,
  pathDirect,
  hideMenu,
  onClick,
}: ItemType) {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const customizer = useSelector((state: AppState) => state.customizer);
  const Icon = item?.icon;
  const theme = useTheme();
  const { t } = useTranslation();
  const itemIcon =
    level > 1 ? (
      <Icon stroke={1.5} size="1rem" />
    ) : (
      <Icon stroke={1.5} size="1.3rem" />
    );

  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: "nowrap",
    marginBottom: "2px",
    padding: "8px 10px",
    borderRadius: `${customizer.borderRadius}px`,
    backgroundColor: level > 1 ? "transparent !important" : "inherit",
    color:
      level > 1 && pathDirect === item?.href
        ? `${theme.palette.primary.main}!important`
        : theme.palette.text.secondary,
    paddingLeft: hideMenu ? "10px" : level > 2 ? `${level * 15}px` : "10px",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
    "&.Mui-selected": {
      color: "white",
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
    },
  }));

  const listItemProps: {
    component: any;
    href?: string;
    target?: any;
    to?: any;
  } = {
    component: item?.external ? "a" : Link,
    to: item?.href,
    href: item?.external ? item?.href : "",
    target: item?.external ? "_blank" : "",
  };

    // '설정' 메뉴일 경우 라우팅을 막고, 다이얼로그만 열리게 설정
    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (item.title === '설정') {
        e.preventDefault(); // 라우팅 방지
        onClick(e); // 다이얼로그 띄우는 함수 호출
      }
    };


  return (
    <List component="li" disablePadding key={item?.id && item.title}>
      
      {item.title === '설정' ? (
        // 설정 메뉴인 경우 다이얼로그만 열리도록 설정
        <ListItemStyled
          disabled={item?.disabled}
          selected={pathDirect === item?.href}
          onClick={handleClick} // 다이얼로그 열기
        >
          <ListItemIcon
            sx={{
              minWidth: "36px",
              p: "3px 0",
              color:
                level > 1 && pathDirect === item?.href
                  ? `${theme.palette.primary.main}!important`
                  : "inherit",
            }}
          >
            {itemIcon}
          </ListItemIcon>
          <ListItemText>
            {hideMenu ? "" : t(`${item?.title}`)}
            <br />
            {item?.subtitle ? (
              <Typography variant="caption">
                {hideMenu ? "" : item?.subtitle}
              </Typography>
            ) : (
              ""
            )}
          </ListItemText>

          {!item?.chip || hideMenu ? null : (
            <Chip
              color={item?.chipColor}
              variant={item?.variant ? item?.variant : "filled"}
              size="small"
              label={item?.chip}
            />
          )}
        </ListItemStyled>
      ) : (

        <Link href={item.href}>
          <ListItemStyled
            disabled={item?.disabled}
            selected={pathDirect === item?.href}
            onClick={lgDown ? onClick : undefined}
          >
            <ListItemIcon
              sx={{
                minWidth: "36px",
                p: "3px 0",
                color:
                  level > 1 && pathDirect === item?.href
                    ? `${theme.palette.primary.main}!important`
                    : "inherit",
              }}
            >
              {itemIcon}
            </ListItemIcon>
            <ListItemText>
              {hideMenu ? "" : t(`${item?.title}`)}
              <br />
              {item?.subtitle ? (
                <Typography variant="caption">
                  {hideMenu ? "" : item?.subtitle}
                </Typography>
              ) : (
                ""
              )}
            </ListItemText>

            {!item?.chip || hideMenu ? null : (
              <Chip
                color={item?.chipColor}
                variant={item?.variant ? item?.variant : "filled"}
                size="small"
                label={item?.chip}
              />
            )}
          </ListItemStyled>
        </Link>
      )}
    </List>
  );
}
