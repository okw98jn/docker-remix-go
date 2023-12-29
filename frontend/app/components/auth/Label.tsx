import { FC } from "react";
import { cva } from "../../../styled-system/css";
import { useField } from "remix-validated-form";

type Props = {
    name: string;
    label: string;
}

export const labelStyle = cva({
    base: {
        fontSize: 'sm', fontWeight: 'bold', display: 'block', mb: '2'
    },
    variants: {
        type: {
            normal: { color: 'black' },
            error: { color: 'red.500' },
        },
    },
});

const Label: FC<Props> = ({ name, label }) => {
    const isError = useField(name);
    const labelType = isError.error ? "error" : "normal";
    return (
        <label htmlFor={name} className={labelStyle({ type: labelType })}>{label}</label>
    );
}

export default Label;