import dayjs from 'dayjs'

export const formatYYYYMMDDHHmm = (value: string) => {
  return dayjs(value).format('YYYY-MM-DD H:mm')
}
