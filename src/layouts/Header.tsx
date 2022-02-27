import { useRouter } from 'next/router';

import { siteConfig } from '@/configs/site-config';
import { ColorModeToggle } from '@/ui/colorMode';
import { GithubIcon } from '@/ui/github';
import clsxm from '@/utils/clsxm';

import LogoLink from './LogoLink';

export default function Header() {
  const router = useRouter();

  const isHomePath = router.asPath === '/';

  return (
    <header className="bg-app h-header-footer flex items-center justify-between px-5 md:gap-9">
      {!isHomePath ? (
        <div className="my-auto">
          <LogoLink />
        </div>
      ) : (
        <div />
      )}
      <div className="flex items-center gap-4 sm:gap-6">
        <a
          href={siteConfig.socials.github.href}
          className={clsxm(
            'text-hint hover:text active:text hover:text-opacity-80 active:text-opacity-100',
            'transition-all',
          )}
        >
          <GithubIcon className="h-7 w-7 sm:h-8 sm:w-8" />
        </a>
        <ColorModeToggle
          className="h-9 w-9 sm:h-11 sm:w-11"
          iconProps={{ className: 'h-5 w-5 sm:h-6 sm:w-6' }}
        />
      </div>
    </header>
  );
}
