import { FC } from "react";
import { css } from "../../../styled-system/css";

type Props = {
    text: 'ログイン' | '新規登録';
}

const Button: FC<Props> = ({ text }) => {
    return (
        <button type="submit" className={css({ w: 'full', p: '2', bg: 'blue.500', color: 'white', borderRadius: 'sm', cursor: 'pointer', _hover: { opacity: '0.8' } })}>{text}</button>
    );
}

export default Button;