import { FC, ReactNode } from "react";
import { css } from "../../../styled-system/css";

type Props = {
    children: ReactNode
}

const Box: FC<Props> = ({ children }) => {
    return (
        <div className={css({ bg: 'gray.100', display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' })}>
            <div className={css({ bg: 'white', border: 'solid 1px', borderColor: 'gray.200', width: '1/4', padding: '8', borderRadius: 'md' })}>
                {children}
            </div>
        </div>
    );
}

export default Box;