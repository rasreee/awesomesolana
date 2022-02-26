import React from 'react';

import { useAppSearchOptions } from '@/app/contexts';
import clsxm from '@/lib/clsxm';
import { AdjustmentsIcon } from '@/ui/icons';

export function SearchOptionsButton() {
  const { isOpen, toggle } = useAppSearchOptions();

  return (
    <button
      onClick={toggle}
      className={clsxm(
        'text leading-none',
        isOpen && 'bg-surface text-color-primary',
        'h-full rounded p-1',
      )}
    >
      <AdjustmentsIcon
        className={clsxm('text-hint', isOpen && 'text-color-primary')}
      />
    </button>
  );
}
