import { css } from '@emotion/react'

import { pseudo } from '@/common/utils'
import styled, { StyledProps } from '@/styled'

export const Dropdown = styled.div`
	flex: 1 1 auto;
	overflow: auto;
`

export const Content = styled.div`
	padding-top: 1.5;
	padding-bottom: 1.5rem;
	padding-left: 1rem;
	padding-right: 0.675rem;
`

export const Section = styled.section``

export const SectionTitle = styled.div`
	line-height: 1.5rem;
	font-weight: var(--font-semibold);
	color: var(--gray-800);
	margin: 0 1.5rem 1rem;
`

export const List = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`

export const ListItem = styled.li`
	display: list-item;
	text-align: -webkit-match-parent;
	list-style: none;
	margin: 0;

	:first-of-type {
		border-top-width: 1px;
		border-color: var(--gray-100);
	}
	border-bottom: 1px solid var(--gray-100);
`

const interactiveButtonStyles = ({ theme }: StyledProps) => css`
	${pseudo('_focus')} {
		background-color: ${theme.colors.primary[500]};
		color: white;
	}
	${pseudo('_hover')} {
		background-color: ${theme.colors.primary[500]};
		color: white;
	}
`

export const ItemButton = styled.button`
	padding: 1rem 1.5rem;
	font-size: 0.875rem;
	color: inherit;
	text-decoration: inherit;
	display: flex;
	align-items: center;
	border-radius: var(--rounded-md);
	width: 100%;
	${interactiveButtonStyles}
`
