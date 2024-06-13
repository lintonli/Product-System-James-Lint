import express, {json} from 'express'
import cron from 'node-cron'
import {run} from './EmailService'
const app = express()
// app.use(json())

cron.schedule('*/10 * * * * *', async()=>{
    await run()
})

app.listen(4001, ()=>{
    console.log("Background service is running")
})