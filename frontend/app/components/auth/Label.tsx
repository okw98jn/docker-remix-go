import { FC } from "react";
import { css } from "../../../styled-system/css";

type Props = {
    name: string;
    label: string;
}

const Label: FC<Props> = ({ name, label }) => {
    return (
        <label htmlFor={name} className={css({ fontSize: 'sm', fontWeight: 'bold', display: 'block', mb: '2' })}>{label}</label>
    );
}

export default Label;