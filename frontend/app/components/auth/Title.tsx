import { FC } from "react";
import { Link } from "@remix-run/react";
import { css } from "../../../styled-system/css";

type Props = {
    title: 'Sign in' | 'Sign up'
    subTitle: 'ログイン' | '新規登録'
    path: '/login' | '/signup'
}

const Title: FC<Props> = ({ title, subTitle, path }) => {
    return (
        <div className={css({ textAlign: 'center' })}>
            <h1 className={css({ fontSize: '2xl', fontWeight: 'bold', marginBottom: '10px' })}>{title}</h1>
            <p className={css({ fontSize: 'xs', color: "gray.600" })}>{subTitle}は<Link to={path} className={css({ color: 'blue.500' })}>こちら</Link></p>
        </div>
    );
}

export default Title;