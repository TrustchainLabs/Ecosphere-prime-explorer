import axios from 'axios'
import { API_URL } from '../constants'

type GetMeasurementsParams = {
    startDate: Date,
    endDate: Date,
    deviceId?: string,
    groupBy?: string
}

export class MeasurementsAPI {
    public static async getMeasurements ({ startDate, endDate, deviceId, groupBy }: GetMeasurementsParams) {
        const res =  await axios.get(`${API_URL}/measurements`, {
            params: {
                startDate,
                endDate,
                deviceId,
                groupBy
            }
        })
        return res.data
    }
}
