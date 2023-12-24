import { Outlet, useActionData } from '@remix-run/react'
import { FC } from 'react'
import styles from '../styles/layout.module.css'
import Header from '~/components/Header'
import { ActionFunction, json } from '@remix-run/node'

export const action: ActionFunction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await new Promise(resolve => setTimeout(resolve, 500));
    return json({ message: 'success' });
}

const TodoLayout: FC = () => {
    const data2 = useActionData();
    console.log(data2);
    return (
        <div className={styles.wrap}>
            <div className={styles.flexColumn}>
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default TodoLayout