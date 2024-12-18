import axios from 'axios'
import { SMART_APP_API_URL } from '../constants'

type GetMeasurementsParams = {
    startDate: Date,
    endDate: Date,
    deviceId?: string,
    groupBy?: string
}

export class MeasurementsAPI {
    public static async getMeasurements ({ startDate, endDate, deviceId, groupBy }: GetMeasurementsParams) {
        const res =  await axios.get(`${SMART_APP_API_URL}/hcs/messages`, {
            params: {
                startDate,
                endDate,
                deviceId,
                groupBy
            },
            withCredentials: true
        })
        return res.data
    }
}
