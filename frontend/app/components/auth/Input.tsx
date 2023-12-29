import { FC } from "react";
import { css, cva } from "../../../styled-system/css";
import { useField } from "remix-validated-form";

type Props = {
    type: 'text' | 'password';
    name: string;
}

export const input = cva({
    base: {
        w: 'full', p: '2', borderRadius: 'sm', _focusVisible: { outline: '1px solid gray' }
    },
    variants: {
        type: {
            normal: { border: 'solid 1px', borderColor: 'gray.200' },
            error: { border: 'solid 1.5px', borderColor: 'red.500', _focusVisible: { outline: '1px solid red' } },
        },
    },
});

const Input: FC<Props> = ({ type, name }) => {
    const isError = useField(name);
    const inputType = isError.error ? "error" : "normal";

    return (
        <>
            <input type={type} id={name} name={name} autoComplete="on" className={input({ type: inputType })} />
            {isError.error && <p className={css({ marginTop: '10px', color: 'red.500', fontSize: 'sm', fontWeight: 'bold' })}>{isError.error}</p>}
        </>
    );
}

export default Input;