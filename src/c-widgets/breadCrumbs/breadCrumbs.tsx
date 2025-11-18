import type { BreadCrumbType } from '../../f-shared/types/breadCrumb';
import { BreadCrumb } from './breadCrumb';

interface DocumentCreateProps {
    items: BreadCrumbType[];
}

export const BreadCrumbs = ({ items }: DocumentCreateProps) => {
    return (
        <div>
            <BreadCrumb/>
            {
                items?.map(it => (
                    <BreadCrumb
                        item={it}
                        key={it.id}
                    />
                ))
            }
        </div>
    );
};
