interface SiteData {
  name: string;
  link: string;
  desc: string;
  lang?: string;
  needLogin?: boolean;
  [key: string]: any;
}
