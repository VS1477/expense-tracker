import React,{useState,useEffect} from "react";
import axios from "axios";
import moment from "moment";
import {Form, Input, message, Modal, Select, Table,DatePicker} from "antd";
const {RangePicker} = DatePicker;
export const Home = ()=>{
    const [showmodal,setShowmodal] = useState(false);
    const api_url = import.meta.env.VITE_API_URL;
    const [alltransaction,setAlltransaction] = useState([]);
    const [frequency,setFrequency] = useState('7');
    const [selectdate,setSelectdate] = useState([]);
    const [type,setType] = useState('all');
    const getalltransaction = async ()=>
    {
        try{
            const user = JSON.parse(localStorage.getItem("user"));
            const  res = await axios.post(`${api_url}/getdata`,{userid:user._id,frequency,selectdate,type});
            setAlltransaction(res.data);
            console.log(res.data)
        }
        catch(Err)
        {
            console.log(Err);
            message.error(Err);
        }
    }
    const columns = [
        {
            title:"Date",
            dataIndex:"date",
            render : (text)=><span>{moment(text).format("DD-MM-YYYY")}</span>,
        },
        {
            title:"Amount",
            dataIndex:"amount"
        },
        {
            title:"Type",
            dataIndex:"type"
        },
        {
            title:"Category",
            dataIndex:"category"
        },
        {
            title:"Reference",
            dataIndex:"reference"

        },
        {
            title:"Description",
            dataIndex:"description",
        },
        {
            title:"Actions",
        }
    ]

    useEffect(()=>
    {   
        getalltransaction();

    },[frequency,selectdate,type]);

    const handleSubmit = async (values)=>
    {
        try{
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(user);
            await axios.post(`${api_url}/adddata`, { ...values, userid: user._id });
            message.success("Transaction Added Successfully");
            setShowmodal(false);
        }
        catch(err)
        {
            message.error("Failed to add transaction");
        }
        
    }
    return(
        <>
        <div className="filters">
            <div>
                <h6>Select Frequency</h6>
                <Select value={frequency} onChange={(values)=>setFrequency(values)}>
                <Select.Option value="7">Last 1 Week</Select.Option>
                <Select.Option value="30">Last 1 Month</Select.Option>
                <Select.Option value="365"> Last 1 Year</Select.Option>
                <Select.Option value="Custom">Cusotm</Select.Option>
                </Select>
                {frequency === "Custom" && <RangePicker value={selectdate} onChange={(values)=>setSelectdate(values)}/>}
            </div>
             <div>
                <h6>Select Type</h6>
                <Select value={type} onChange={(values)=>setType(values)}>
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
                </Select>
                {frequency === "Custom" && <RangePicker value={selectdate} onChange={(values)=>setSelectdate(values)}/>}
            </div>
            <div>
                <button className="btn btn-primary" onClick={()=>setShowmodal(true)}>Add New</button>
            </div>
        </div>
        <div className="content">
            <Table columns={columns} dataSource={alltransaction}></Table>
        </div>

        <Modal title="Add transaction" open={showmodal} onCancel={()=>setShowmodal(false)} footer={false}>
        <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Amount" name="amount">
                <Input type="text"/>
            </Form.Item>
            <Form.Item label="Type" name="type">
                <Select>
                    <Select.Option value="income">Income</Select.Option>
                    <Select.Option value="expense">Expense</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
                <Select>
                    <Select.Option value="salary">Salary</Select.Option>
                    <Select.Option value="tip">Tip</Select.Option>
                    <Select.Option value="project">Project</Select.Option>
                    <Select.Option value="food">Food</Select.Option>
                    <Select.Option value="movie">Movie</Select.Option>
                    <Select.Option value="bills">Bills</Select.Option>
                    <Select.Option value="medical">Medical</Select.Option>
                    <Select.Option value="fee">Fee</Select.Option>
                    <Select.Option value="tax">TAX</Select.Option>

                </Select>
            </Form.Item>
            <Form.Item label="Reference" name="reference">
                <Input type="text" />
            </Form.Item>
            <Form.Item label="Description" name="description">
                <Input type="text"/>
            </Form.Item>
            <Form.Item label="Date" name="date">
                <Input type="date"/>
           </Form.Item>
           <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">SAVE</button>
           </div>
        </Form>
        </Modal>
        
        </>
    )
}