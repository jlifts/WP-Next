import { Menu as WPMenu } from '@wpengine/headless/react';
import React from 'react';
import Menu from './Menu';
import SignUp from './SignUp';

interface Props {
  copyrightHolder?: string;
}

function Footer({ copyrightHolder = 'Victis Health' }: Props): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="flex bg-darkgray w-screen h-full p-4">
      <div className="h-full">
        <SignUp />
        <div className="flex justify-around text-white pt-16">
          <div className="flex flex-col">
            <div className="flex flex-col w-80 h-80">
              <h6 className="font-bold -mb-4 ml-3 pt-16">Navigation</h6>
              <Menu />
            </div>
            <div className="flex flex-col w-80 h-80">
              <h6 className="font-bold -mb-4 pt-36 ml-3">Legal</h6>
              {/* <Legal /> */}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col w-80 h-80">
              <h6 className="font-bold -mb-4 pt-16 ml-3">Follow Us</h6>
              {/* <Legal /> */}
            </div>
            <div className="flex flex-col w-80 h-80">
              <h6 className="font-bold -mb-4  ml-3">FDA Disclosure</h6>
              {/* <Legal /> */}
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

export default Footer;
