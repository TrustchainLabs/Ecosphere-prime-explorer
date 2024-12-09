import axios from 'axios'

export class NodesAPI {
    public static async getNodes () {
        const res =  await axios.get('https://mocki.io/v1/b858cfac-b25f-4677-b590-8278a0b33a5b')
        return res.data
    }
}
