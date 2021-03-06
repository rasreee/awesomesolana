import * as React from 'react';

const Seo = dynamic(() => import('@/ui/seo'));

import dynamic from 'next/dynamic';

import Header from './header';
import type { LayoutProps } from './types';

export const Layout = ({
  children,
  seo: seoProps,
}: React.PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Seo {...seoProps} />
      <div className="bg-app min-h-full w-screen">
        <Header />
        <main className="bg-app min-h-main flex-1">{children}</main>
      </div>
    </>
  );
};
