export interface Slide {
  id: string;
  slideName: string;
  type: string;
  content: ContentItem;
  slideOrder: number;
  classname?: string;
}

export interface ContentItem {
  id: string;
  type: ContentType;
  name: string;
  content: ContentItem[] | string | string[] | string[][];
  initialRows?: number;
  initialColumns?: number;
  columns?: number;
  planeholder?: string;
  className?: string;
  alt?: string;
  callOutType?: 'success' | 'warning' | 'info' | 'question' | 'caution';
  link?: string;
  code?: string;
  language?: string;
  bgColor?: string;
  isTransparent?: boolean;
}

export type ContentType =
  | 'column'
  | 'resizable-column'
  | 'text'
  | 'paragraph'
  | 'image'
  | 'table'
  | 'multiColumn'
  | 'blank'
  | 'imageAndText'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'title'
  | 'table'
  | 'blockquote'
  | 'numberList'
  | 'bulletedList'
  | 'code'
  | 'link'
  | 'quote'
  | 'devider'
  | 'calloutBox'
  | 'todoList'
  | 'bulletList'
  | 'codeBlock'
  | 'customButton'
  | 'tableOfContents';

export interface Theme {
  name: string;
  fontFamily: string;
  fontColor: string;
  backgroundColor: string;
  slideBackgroundColor: string;
  accentColor: string;
  gradientBackground?: string;
  sidebarColor?: string;
  navbarColor?: string;
  type: 'light' | 'dark';
}
export interface OutlineCard {
  title: string;
  id: string;
  order: number;
}
