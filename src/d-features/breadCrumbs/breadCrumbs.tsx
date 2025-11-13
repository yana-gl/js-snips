import { useNavigate } from "react-router-dom";

export type BreadCrumb = {
    id: string;
    name: string;
}

interface DocumentCreateProps {
    items?: BreadCrumb[];
}

export const BreadCrumbs = ({ items }: DocumentCreateProps) => {
    const navigate = useNavigate();

    const goToFolder = (id?: string) => {
        if (id) {
            navigate(`/folder/${id}`);
        } else {
            navigate('/');
        }
    };

    return (
        <div>
            <span
                onClick={() => goToFolder()}
                className={'cursor-pointer subtitle'}
            >
                &nbsp;
                <span>
                    home
                </span>
                &nbsp;
                /
            </span>
            {
                items?.map(it => (
                    <span
                        onClick={() => goToFolder(it.id)}
                        key={it.id}
                        className={'cursor-pointer subtitle'}
                    >
                        &nbsp;
                        <span>
                            {
                                it.name.length > 10
                                    ? `${it.name.slice(0, 10)}...`
                                    : it.name
                            }
                        </span>
                        &nbsp;
                        /
                    </span>
                ))
            }
        </div>
    );
};
