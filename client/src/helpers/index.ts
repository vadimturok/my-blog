import moment from "moment";

export const formatDate = (date: Date) => moment(date).format('ll')
export const formatTime = (date: Date) => moment(date).format('LT')

export const ICON = 'https://firebasestorage.googleapis.com/v0/b/post-images-storage.appspot.com/o/%2Fposts%2Ffavicon.ico?alt=media&token=0b05d86f-af11-44c9-a68e-c610ddf2d84f'