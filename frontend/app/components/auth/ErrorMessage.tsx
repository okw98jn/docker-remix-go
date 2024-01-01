import { FC } from "react";
import { css } from "../../../styled-system/css";

type Props = {
    errorMessage: string
}
const ErrorMessage: FC<Props> = ({ errorMessage }) => {
    return (
        <p className={css({ color: 'red.500', fontSize: 'sm', marginBottom: '15px', fontWeight: 'bold' })}>{errorMessage}</p>
    )
}

export default ErrorMessage;