import {Client as WorkflowClient} from '@upstash/workflow'
import config from './confing'

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken
})