import { createSlice } from '@reduxjs/toolkit'
import http from '../../utils/http'


const kaSlice = createSlice({
  name: 'ka',
  initialState: {
    // 2021: [{ type, date, money, useFor }]
    //  type: 'pay' | 'income'
    // 2022: [{ type, date, money, useFor }]
    billList: [],
  },
  reducers: {
    setBillList (state, action) {
      state.billList = action.payload
    },
    addBill (state, action) {
      state.billList.push(action.payload)
    }
  }
})

// 记一笔
const { addBill } = kaSlice.actions
const createBill = (data) => {
  return async (dispatch) => {
    const res = await http.post('/ka', data)
    dispatch(addBill(res.data))
  }
}

// 获取
const { setBillList } = kaSlice.actions
const getBills = () => {
  console.log(`output->`,);
  return async (dispatch) => {
    const res = await http.get('/ka')
    dispatch(setBillList(res.data))
  }
}
const delBills = (id) => {
  return async (dispatch) => {
    await http.delete(`ka/${id}`)
    const res = await http.get('/ka')
    dispatch(setBillList(res.data))
  }
}
export default kaSlice.reducer

export {
  createBill,
  getBills,
  delBills
}
