interface DragElementContentProps {
    name: string;
}

export const DragElementContent = ({ name }: DragElementContentProps) => (
    <>
        <p>
            {name}
        </p>
    </>
);
