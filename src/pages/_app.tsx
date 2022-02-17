import '@/styles/globals.css';
import '@/styles/colors.css';

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import { theme } from '@/ui/emotion/theme';
import { SearchModalProvider, SearchResultData } from '@/ui/searchModal';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleSelect = (selectedItem: SearchResultData) => {
    console.log('Selected item: ' + selectedItem);
    router.push(`/hits/${selectedItem.id}`);
  };

  return (
    <NextThemeProvider attribute="class">
      <EmotionThemeProvider theme={theme}>
        <SearchModalProvider onSelect={handleSelect}>
          <Component {...pageProps} />
        </SearchModalProvider>
      </EmotionThemeProvider>
    </NextThemeProvider>
  );
}

export default MyApp;
