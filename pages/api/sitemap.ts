/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { CATAGORIES } from 'graphql/Queries';
import { Client } from 'lib/ApolloClient';

// Dynamic Sitemap
export default async (
  req: { headers: { host: any } },
  res: {
    writeHead: (arg0: number, arg1: { 'Content-Type': string }) => void;
    end: (arg0: string) => void;
  },
) => {
  const links: any[] = [];
  //   Add main pages
  const pages = [
    '/404',
    '/',
    '/about',
    '/contact',
    '/faq',
    '/tc',
    '/privacy-policy',
    '/return-policy',
    '/coa',
    '/shop',
    // '/news',
  ];
  pages.map((url) => {
    links.push({
      url,
      changefreq: 'daily',
      priority: 0.9,
    });
  });

  // Dynamic post function
  const { data: catagories } = await Client.query({ query: CATAGORIES });
  catagories?.productCategories?.nodes?.map((cat: any) => {
    links.push({
      url: `/shop/${cat.slug}`,
      changefreq: 'daily',
      priority: 0.9,
    });
  });

  catagories.productCategories.nodes.map((cat: any) => {
    const { slug } = cat;
    cat.products.nodes.map((param: any) =>
      links.push({
        url: `/shop/${slug}/${param.slug}`,
        changefreq: 'daily',
        priority: 0.9,
      }),
    );
  });

  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` });

  res.writeHead(200, {
    'Content-Type': 'application/xml',
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream),
  ).then((data) => data.toString());

  res.end(xmlString);
};
