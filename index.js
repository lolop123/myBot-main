const TelegramApi = require('node-telegram-bot-api')
const token = '5310197247:AAHybYrrOzlHWaedUWF6tVvW9ykbxETEewE'

const {getVideo} = require('./video/get-video')
const {getDownloadUrl} = require('./video/get-download-link')

const bot = new TelegramApi(token , {polling: true})

bot.on('message' , async data =>{

    const chatId = data.chat.id
    const text = data.text

    const isTttUrl = text.split('/')[2]

    if(isTttUrl !== 'vm.tiktok.com') return

    const {link , createUrlError} = await getDownloadUrl(text)

    if(createUrlError)
        return await bot.sendMessage(chatId , createUrlError)

    const {video , downloadVideoError} = await getVideo(link)

    if(downloadVideoError)
        return await bot.sendMessage(chatId , downloadVideoError)

    return await bot.sendVideo(chatId , video)

})

