import React from 'react'
import { IProduct } from '../../../models/product'
import Table, { ColumnsType } from 'antd/es/table';
import { Button, Popconfirm, Tag } from 'antd';
import { render } from '@testing-library/react';
import { DeleteOutlined } from "@ant-design/icons"
import axios from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import moment from 'moment';

interface Props {
  productData: IProduct[] | undefined,
  handleDelete: any,
  viewDetail: any
}

function TableList(props: Props) {

  const { productData, handleDelete, viewDetail } = props



  const columns: ColumnsType<IProduct> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={status == "PENDING" ? "" : (status === "FULFILLED" ? "green" : (status === "PROCESSING" ? "orange" : "blue"))}>{status}</Tag>
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: moment.Moment) => moment(createdAt).format('D MMM YYYY')
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: '',
      dataIndex: 'btn-detial',
      render: (_, record: IProduct) => (
        <Button onClick={() => viewDetail(record.id)}>
          View Detail
        </Button>
      )
    }
    ,
    {
      title: '',
      dataIndex: 'btn_delete',
      render: (_, record: IProduct) => (
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
          <Button type={'text'} danger >
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      )
    }
  ];


  return (
    <>
      <Table columns={columns} dataSource={productData} bordered />;
    </>
  )
}

export default TableList