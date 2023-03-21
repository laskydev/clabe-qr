import {FC, ReactNode} from "react";

interface Props {
    children: ReactNode;
}

export const Container: FC<Props> = ({children}) => {
    return (
        <main
            className="top-1/2 left-0 right-0 mx-auto w-fit rounded-xl bg-white  px-8 py-8 drop-shadow-2xl transition hover:-translate-y-1">
            {children}
        </main>
    );
};
