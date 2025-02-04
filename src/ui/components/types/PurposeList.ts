import  {ComponentChildren, FunctionComponent} from 'preact';

export interface PurposeListProps {
	children?: ComponentChildren;
}

export type PurposeListComponent = FunctionComponent<PurposeListProps>;
