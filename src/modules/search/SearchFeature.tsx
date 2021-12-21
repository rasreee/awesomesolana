import React from 'react'

import { useModal } from '@/common/components/Modal/useModal'
import { useKeyCombo } from '@/common/hooks/useKeyCombo'

import { SearchButton } from './SearchButton'
import { SearchModal } from './SearchModal'

export const SearchFeature: React.FunctionComponent = () => {
	const modal = useModal()
	useKeyCombo('Meta+k', modal.open)

	return (
		<>
			<SearchButton onClick={modal.open} />
			<SearchModal {...modal} />
		</>
	)
}
