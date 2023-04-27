import React, { useEffect, useState } from 'react'
import TableList from '../component/TableList'
import { useDispatch, useSelector } from 'react-redux'
import { IProduct } from '../../../models/product'
import { filterProduct, selectProductData, selectProductDataFilter, setProductData } from '../redux/productReducer'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_KEY } from '../../../utils/constants'
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode'
import { Button, Select, message, DatePicker, Input, Form } from 'antd'
import { useNavigate } from 'react-router-dom'
import '../scss/HomePage.scss'

interface Props { }

export const HomePage = (props: Props) => {
  const productDataFilter: IProduct[] = useSelector(selectProductDataFilter)
  const nav = useNavigate()
  const [count, setCount] = useState<any>(0)
  const dispatch = useDispatch()
  const [productDatashow, setProductDatashow] = useState<IProduct[]>()
  const [client, setclient] = useState<any>([])
  const seen = new Set<string>();
  const [filterKey, setFilterKey] = useState<any>({})

  const getProduct = async () => {
    const res = await axios.get("http://api.training.div3.pgtest.co/api/v1/product", { headers: { Authorization: Cookies.get(ACCESS_TOKEN_KEY) } })

    if (res?.data.code === RESPONSE_STATUS_SUCCESS) {
      dispatch(setProductData(res.data.data))
      res?.data.data.map((val: any) => {
        if (val.client && !seen.has(val.client)) {
          seen.add(val.client);
          client.push({ value: val.client, label: val.client })
        }
      })
      setclient([...client])
    }
  }

  const handleDelete: any = async (id: any) => {
    const res = await axios.delete("http://api.training.div3.pgtest.co/api/v1/product/" + id, { headers: { Authorization: Cookies.get(ACCESS_TOKEN_KEY) } })
    if (res?.data.code === RESPONSE_STATUS_SUCCESS) {
      message.success("Delete success")
      setCount(count + 1)
    }
  }

  const filterData = () => {
    dispatch(filterProduct(filterKey))
  }

  // const clearfilterData = () => {
  //   dispatch(filterProduct({
  //     client:"",
  //     from: "",
  //     status:"",
  //     to: ""
  //   }))
  // }

  const viewDetail = async (id: any) => {
    nav('/product/' + id)
  }

  useEffect(() => {
    getProduct()
  }, [count])

  return (
    <div className='HomePage'>
      <div className="header">
        <Button onClick={() => { nav('/profile') }}>
          Trang cá nhân
        </Button>
      </div>
      <div className="body">
        <div className="body_right">
          <Select
            style={{ width: 150 }}
            placeholder={'Status'}
            onChange={(e) => { setFilterKey({ ...filterKey, status: e }) }}
            options={[
              { value: 'PENDING', label: 'PENDING' },
              { value: 'FULFILLED', label: 'FULFILLED' },
              { value: 'PROCESSING', label: 'PROCESSING' },
              { value: 'RECEIVED', label: 'RECEIVED' },
            ]}
          />

          <Select
            style={{ width: 150 }}
            placeholder={'Client'}
            onChange={(e) => { setFilterKey({ ...filterKey, client: e }) }}
            options={client ? client : null}
          />

          <DatePicker
            onChange={(date, datestring) => { setFilterKey({ ...filterKey, from: datestring }) }}
          />
          <DatePicker
            onChange={(date, datestring) => { setFilterKey({ ...filterKey, to: datestring }) }}
          />

        </div>
        <div className="body-left">
          <Button type="primary" onClick={filterData}> Apply </Button>
          {/* <Button > Clear </Button> */}
        </div>
      </div>
      <div className="table-data">
        <TableList productData={productDataFilter} handleDelete={handleDelete} viewDetail={viewDetail} />
      </div>
    </div>
  )
}