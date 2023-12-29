import { FC } from "react";
import { css } from "../../../styled-system/css";

type Props = {
    type: 'text' | 'password';
    name: string;
}

const Input: FC<Props> = ({ type, name }) => {
    return (
        <input type={type} id={name} name={name} className={css({ w: 'full', p: '2', border: 'solid 1px', borderColor: 'gray.200', borderRadius: 'sm' })} />
    );
}

export default Input;