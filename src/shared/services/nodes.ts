import axios from 'axios'
import { Geometry } from '../../shared/types'
import { SMART_APP_API_URL } from '../constants'

type RegisterNodeParams = {
    name: string
    uuid: string
    location: Geometry
}

type GetNodesParams = {
    includeLatestMeasurement?: boolean
}

export class NodesAPI {
    public static async registerNode ({ name, uuid, location }: RegisterNodeParams) {
        const res = await axios.post(
            `${SMART_APP_API_URL}/devices`,
            {
                name,
                uuid,
                location
            },
            {
                withCredentials: true
            }
        )
        return res.data
    }

    public static async getNodes ({ includeLatestMeasurement }: GetNodesParams) {
        const res =  await axios.get(`${SMART_APP_API_URL}/devices`, {
            params: {
                includeLatestMeasurement
            },
            withCredentials: true
        })
        return res.data
    }
}
