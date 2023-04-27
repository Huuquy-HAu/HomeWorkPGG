import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ACCESS_TOKEN_KEY } from '../../../utils/constants'
import { IProduct } from '../../../models/product'
import { Button, Form, Input, Modal, Select, message } from 'antd'
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode'
import '../scss/ProductPage.scss'

interface Props {

}

interface IFormValues {
    status: string;
    total :string;
    client:string
}

const ProductPage = (props: Props) => {
    const { id } = useParams()
    const [productDetailItem, setproductDetailItem] = useState<IProduct>()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<IFormValues>()
    const [count ,setCount] =useState<number>(0)

    const getProductDetail = async () => {
        const res = await axios.get(`http://api.training.div3.pgtest.co/api/v1/product/${id}`, { headers: { Authorization: Cookies.get(ACCESS_TOKEN_KEY) } })
        console.log(res);
        setproductDetailItem(res.data.data)
        form.setFieldsValue({
            status: res?.data.data.status,
            total:res?.data.data.total,
            client:res?.data.data.client
        });
    }

    useEffect(() => {
        getProductDetail()
    }, [count])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (e: any) => {
        setIsModalOpen(false);
        const newData = new Object({
            id: id,
            order: productDetailItem?.order,
            status: e.status,
            total: e.total,
            currency: productDetailItem?.currency,
            fundingMethod: productDetailItem?.fundingMethod,
            client:e.client
        })

        console.log(newData);
        const res = await axios.put('http://api.training.div3.pgtest.co/api/v1/product', newData , {headers:{Authorization:Cookies.get(ACCESS_TOKEN_KEY)}})
        if(res?.data.code == RESPONSE_STATUS_SUCCESS){
            message.success("Đổi thông tin thành công")
            return setCount(count+1)
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <div className='ProductPage'>
            {productDetailItem ?
                <div>
                    <div>ID : {productDetailItem.id}</div>
                    <div>Status : {productDetailItem.status}</div>
                    <div>Total : {productDetailItem.total}</div>
                    <div>Currency : {productDetailItem.currency}</div>
                    <div>Order : {productDetailItem.order}</div>
                    <div>Client : {productDetailItem.client}</div>
                    <div>Funding Method : {productDetailItem.fundingMethod}</div>
                </div>
                : <h1>Loading . . . .</h1>
            }
            <Button type='primary' onClick={showModal}>
                Edit product
            </Button>

            <Modal title="Change Detail Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} >
                <Form
                    onFinish={handleOk}
                    form ={form}
                >
                    <Form.Item
                        label="Status"
                        name="status"
                    >
                        <Select
                            style={{ width: 150 }}
                            options={[
                                { value: 'PENDING', label: 'PENDING' },
                                { value: 'FULFILLED', label: 'FULFILLED' },
                                { value: 'PROCESSING', label: 'PROCESSING' },
                                { value: 'RECEIVED', label: 'RECEIVED' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Total"
                        name="total"
                        rules={[{ required: true, message: 'Please input total!' }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Client"
                        name="client"
                        rules={[{ required: true, message: 'Please input client!' }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="button" onClick={handleCancel}>
                            Close
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}

export default ProductPage