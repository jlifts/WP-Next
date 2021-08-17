/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { gql, useQuery } from '@apollo/client';
import { getApolloClient } from '@wpengine/headless';
import { getNextStaticProps } from '@wpengine/headless/next';
import { Menu as WPMenu } from '@wpengine/headless/react';
import { GetStaticPropsContext } from 'next';
import React from 'react';
import LegalMenu from './LegalMenu';
import Menu from './Menu';
import SignUp from './SignUp';
import Socials from './Socials';

interface Props {
  copyrightHolder?: string;
}

const legalQuery = gql`
  query MyQuery {
    post(id: "cG9zdDoyOTE5") {
      content
    }
  }
`;

function Footer({ copyrightHolder }: Props): JSX.Element {
  const year = new Date().getFullYear();
  const { data } = useQuery(legalQuery);
  const fda = data?.post.content.replace('<p>', '').replace('</p>', '');

  return (
    <footer className="flex bg-darkgray w-screen font-rale">
      <div className="h-full">
        <SignUp />
        <div className="flex justify-around text-white pt-16">
          <div className="flex flex-col">
            <div className="flex flex-col h-80">
              <h6 className="font-bold -mb-4 ml-3 pt-16 px-11">Navigation</h6>
              <Menu open="true" />
            </div>
            <div className="flex flex-col w-80 h-80">
              <h6 className="font-bold -mb-4 pt-36 ml-3 px-11">Legal</h6>
              <LegalMenu open="true" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col  h-80">
              <h6 className="font-bold -mb-4 pt-16 ml-3">Follow Us</h6>
              <div className="pt-10 pl-3">
                <Socials />
              </div>
            </div>
            <div className="flex flex-col w-72">
              <h6 className="font-bold -mb-4 ml-3">FDA Disclosure</h6>
              <p className="pt-5 pl-3 text-sm">{fda}</p>
            </div>
          </div>
        </div>
        <div className="flex w-screen justify-center items-end h-20">
          <p className="flex text-white font-light text-sm">{`© ${year} ${copyrightHolder}. All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = getApolloClient(context);
  void client.query({
    query: legalQuery,
  });
  return getNextStaticProps(context);
}

export default Footer;
