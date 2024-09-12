import classNames from 'classnames'
import { useState, useEffect } from 'react'
import { billTypeToName } from '@/contant/billList'
import Icon from '@/components/Icon'
import OneLineOverview from '@/components/OneLineOverview'
import './index.scss'
import { useSelector, useDispatch } from 'react-redux'
import { delBills,getBills } from '@/store/slices/ka'
const DailyBill = ({ dateText, overview, billList }) => {
  const [expand, setExpand] = useState(true)
  const dispatch = useDispatch();
  const DelBillList = (e) => {
      dispatch(delBills(e.id))
  }
  return (
    <div className={classNames('dailyBill', expand && 'expand')}>
      <div className="header">
        <div className="dateIcon" onClick={() => setExpand(!expand)}>
          <span className="date">{dateText}</span>
          <div  >
            <Icon

              type="arrowcircle"
              className={classNames('icon', expand && 'expand')}
            />
          </div>

        </div>
        <OneLineOverview pay={overview.pay} income={overview.income} />
      </div>

      <div className="billList">
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              <div className="icon">
                <Icon type={item.useFor} />
              </div>
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
              <div onClick={() => DelBillList(item)} style={{ marginLeft: '5px' }} className={classNames('money', "pay")}>
                删除
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DailyBill
