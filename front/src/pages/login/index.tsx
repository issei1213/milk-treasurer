import {NextPage} from "next";
import {FC} from "react";
import {Head} from "~/components/ui/Head";

const Login: FC = () => {
    return (
        <p>ログインページ</p>
    )
}

const Index: NextPage = () =>  {
    return(
        <>
            <Head title='ログイン'/>
            <Login/>
        </>
    )
}

export default Index
