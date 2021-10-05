/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ScrollToTop(): any {
  const { pathname } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
