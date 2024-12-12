import axios from 'axios'
import { API_URL } from '../constants'

type GetNodesParams = {
    includeLatestMeasurement?: boolean
}

export class NodesAPI {
    public static async getNodes ({ includeLatestMeasurement }: GetNodesParams) {
        const res =  await axios.get(`${API_URL}/devices`, {
            params: {
                includeLatestMeasurement
            }
        })
        return res.data
    }
}
