/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useQuery } from '@apollo/client';
import { getApolloClient } from '@wpengine/headless';
import { getNextStaticProps } from '@wpengine/headless/next';
import { FDA_QUERY } from 'graphql/Queries';
import { GetStaticPropsContext } from 'next';
import React from 'react';
import { CopyRightProps } from 'typings/global';
import LegalMenu from './LegalMenu';
import Menu from './Menu';
import SignUp from './SignUp';
import Socials from './Socials';

function Footer({ copyrightHolder }: CopyRightProps): JSX.Element {
  const year = new Date().getFullYear();
  const { data } = useQuery(FDA_QUERY);
  const fda = data?.post.content.replace('<p>', '').replace('</p>', '');

  return (
    <footer className="flex bg-darkgray w-screen font-rale">
      <div className="h-full">
        <SignUp />
        <div className="flex justify-around text-white pt-2">
          <div className="flex flex-col">
            <div className="flex flex-col h-80">
              <h6 className="font-bold -mb-4 ml-3 pt-16 px-11 cursor-default">
                Navigation
              </h6>
              <Menu open="true" />
            </div>
            <div className="flex flex-col w-80 h-80">
              <h6 className="font-bold -mb-4 pt-36 ml-3 px-11">Legal</h6>
              <LegalMenu open="true" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col  h-80">
              <h6 className="font-bold -mb-4 pt-16 ml-3 cursor-default">
                Follow Us
              </h6>
              <div className="pt-10 pl-3">
                <Socials />
              </div>
            </div>
            <div className="flex flex-col w-72">
              <h6 className="font-bold -mb-4 ml-3 cursor-default">
                FDA Disclosure
              </h6>
              <p className="pt-5 pl-3 text-sm cursor-default">{fda}</p>
            </div>
          </div>
        </div>
        <div className="flex w-screen justify-center items-end h-20">
          <p className="flex text-white font-light text-sm cursor-default">{`© ${year} ${copyrightHolder}. All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = getApolloClient(context);
  void client.query({
    query: FDA_QUERY,
  });
  return getNextStaticProps(context);
}

export default Footer;
