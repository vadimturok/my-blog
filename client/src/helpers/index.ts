import moment from "moment";

export const formatDate = (date: Date) => moment(date).format('ll')
export const formatTime = (date: Date) => moment(date).format('LT')

export const ICON = 'https://firebasestorage.googleapis.com/v0/b/post-images-storage.appspot.com/o/%2Fposts%2Ffavicon.ico?alt=media&token=0b05d86f-af11-44c9-a68e-c610ddf2d84f'

export function hex2rgb(hex: string) {
    let validHEXInput = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!validHEXInput) {
        return false;
    }
    return [
        parseInt(validHEXInput[1], 16),
        parseInt(validHEXInput[2], 16),
        parseInt(validHEXInput[3], 16),
    ]
}