import type { ReactNode } from "react";

// The base structure for items inside a dropdown or sub-menu
export interface NavSubItem {
  title: string;
  url: string;
}

// Navigation item with an icon and potential sub-items
export interface NavItem {
  title: string;
  url: string;
  icon?: ReactNode; // Using ReactNode to support <Icon /> components
  isActive?: boolean;
  items?: NavSubItem[];
}

// Specifically for the "documents" section which uses 'name' instead of 'title'
export interface DocumentItem {
  name: string;
  url: string;
  icon?: ReactNode;
}

export interface AppSideBar {
  user: {
    name: string;
    email: string;
    avatar?: string; // URL or imported image path
  };
  navMain: NavItem[];
  navClouds: NavItem[];

  // Included from your comments for future use
  navSecondary?: NavItem[];
  documents?: DocumentItem[];
}
