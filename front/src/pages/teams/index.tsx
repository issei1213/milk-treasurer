import { FC } from 'react'
import { NextPage } from 'next'
import { Head } from '~/components/ui/Head'

const Teams: FC = () => {
  return <p>ログインに成功しました</p>
}

const Index: NextPage = () => {
  return (
    <>
      <Head title="ログイン" />
      <Teams />
    </>
  )
}

export default Index
