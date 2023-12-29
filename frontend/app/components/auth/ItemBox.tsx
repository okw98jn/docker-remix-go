import { FC, ReactNode } from "react";
import { css } from "../../../styled-system/css";

type Props = {
    children: ReactNode
}

const ItemBox: FC<Props> = ({ children }) => {
    return (
        <div className={css({ mb: '4' })}>
            {children}
        </div>
    );
}

export default ItemBox;