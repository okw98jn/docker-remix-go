import { FC } from "react";
import { useNavigation } from "@remix-run/react";
import { cva } from "../../../styled-system/css";

type Props = {
    text: 'ログイン' | '新規登録';
}

export const button = cva({
    base: {
        w: 'full', p: '2', borderRadius: 'sm'
    },
    variants: {
        type: {
            normal: { bg: 'blue.500', color: 'white', cursor: 'pointer', _hover: { opacity: '0.8' } },
            loading: { bg: "#888888a9", color: "#ffffff" },
        },
    },
});

const Button: FC<Props> = ({ text }) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const btnStyle = isSubmitting ? button({ type: "loading" }) : button({ type: "normal" });
    return (
        <button type="submit"
            className={btnStyle}
            disabled={isSubmitting}
        >
            {isSubmitting ? '送信中...' : text}
        </button>
    );
}

export default Button;