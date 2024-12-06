import axios from 'axios'

export class NodesAPI {
    public static async getNodes () {
        const res =  await axios.get('https://mocki.io/v1/36ef7ff8-d0d8-4f08-a13b-272076c3d39d')
        return res.data
    }
}
