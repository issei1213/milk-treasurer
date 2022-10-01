import { FC } from 'react'
import NextHead from 'next/head'

type Props = {
  title: string
}

export const Head: FC<Props> = ({ title }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NextHead>
  )
}
