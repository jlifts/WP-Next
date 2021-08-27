/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-redeclare */
import { UrlObject } from 'url';
import { HeadingProps } from '../components/Heading';

declare module '*.svg';

interface AthleteProps {
  headingLevel?: HeadingProps['level'];
  bgImage?: UrlObject | string;
  name?: string;
  subTitle?: string;
  Insta?: string;
  Facebook?: string;
  Twitter?: string;
  id?: string;
}

interface CardProps {
  name?: string;
  id?: string;
  image?: string;
  description?: string;
  level?: HeadingProps['level'];
}

interface CTAProps {
  title: string;
  buttonText?: string;
  buttonURL?: string;
  children?: React.ReactNode;
  headingLevel?: HeadingProps['level'];
}

interface CopyRightProps {
  copyrightHolder?: string;
}

interface HeaderProps {
  title?: string;
  description?: string;
}

// HeadingProps constrains headings to levels h1-h6.
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface HeroProps {
  title?: string;
  subtitle?: string;
  id?: string;
  bgImage?: string;
  buttonText?: string;
  buttonURL?: UrlObject | string;
  button2Text?: string;
  button2URL?: string;
  children?: React.ReactNode;
}

interface PopProps {
  headingLevel?: HeadingProps['level'];
  title?: string;
  subTitle?: string;
  body?: string;
  body2?: string;
  body3?: string;
  body4?: string;
  id?: string;
}

interface PostProps {
  posts: WPGraphQL.Post[] | undefined;
  intro?: string;
  id?: string;
  heading?: string;
  headingLevel?: HeadingProps['level'];
  postTitleLevel?: HeadingProps['level'];
  readMoreText?: string;
}

interface NavProps {
  catagory: string;
  link: UrlObject | string;
  catagory2?: string | null;
  link2?: UrlObject | string;
  catagory3?: string | null;
  link3?: UrlObject | string;
}

interface MenuQuery {
  // [node: string]: { label: string; url: string; id: string };
  label: string;
  url: string;
  id: string;
}
interface MenuProps {
  open: boolean | any;
  data?: string | any;
}

interface CatagoryQuery {
  id: string;
  name: string;
  slug: string;
  image: string | any;
}

interface ProductQuery {
  name: string;
  id?: string;
  price: string;
  regularPrice?: string;
  stockStatus: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  featuredImage?: any;
  slug: string;
}

type SignUpData = {
  email: string;
  name: string;
};

type ContactData = {
  ename: string;
  email: string;
  subject: string;
  messageBox: string;
};
