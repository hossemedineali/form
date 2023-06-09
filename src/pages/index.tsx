import { type NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Table } from "antd";
import { api } from "~/utils/api";

type FormData = {
  id?:string
  name: string;
  email: string;
  phone?: string;
};



const fakedata=[
  { name: "John", email: "john@example.com", phone: "123-456-7890" },
  { name: "Jane", email: "jane@example.com", phone: "234-567-8901" },
  { name: "Bob", email: "bob@example.com", phone: "345-678-9012" },
]

const Home: NextPage = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: ( record :FormData) => (
        <Button type="link" danger onClick={() => handleDelete(record.id as string)}>Delete</Button>
      ),
    },
  ];
 // const hello = api.example.hello.useQuery({ text: "from tRPC" });
 const load=api.example.load.useQuery()
 
 const save=api.example.save.useMutation() 
 const deletAll=api.example.deletAll.useMutation()
 const update=api.example.update.useMutation()
 const DeleteOne=api.example.deleteOne.useMutation()
 const [form] = Form.useForm();
load.refetch()

  const [show,setShow]=useState(false)
  const [notification, setnotification] = useState(false)
  const [currentId,setCurrentID]=useState('')
 const [mydata,setmydata]=useState<FormData[]>()
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" });
  
  useEffect(()=>{
    form.resetFields()
    if(load.data){
      setmydata(load.data as FormData[])
    }
  },[load.data])
  const handleSubmit = () => {
    console.log(formData);
  };

  const handleSaveToDb=()=>{
    let isExisitng=false
        load.data?.map((item)=>{
            if(item.id==currentId){
              isExisitng =true
            }
        })
    form.resetFields
        if(isExisitng){
            update.mutate({...form.getFieldsValue(),id:currentId})
        }else{
          save.mutate({...form.getFieldsValue()})
          setmydata(load.data as FormData[])
          if(save.isSuccess){
            
          }
          if(save.isError){
          }
        }
    
   setCurrentID('')
  }



const handelAddToForm=(e:FormData)=>{
  form.setFieldsValue(e)
  setCurrentID(e.id as string)}

  const handleDeletAll=()=>{
     deletAll.mutate()
    load.refetch()
  }

  const handleDelete = (id: string) => {
   // deleteEntry.mutate(id);
  DeleteOne.mutate({id})
  setnotification(true)
  };
  

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex relative min-h-screen flex-col items-center justify-center bg-slate-800">
        <button onClick={()=>{setShow(!show)}} className="absolute top-7 border-white border-2 p-2 rounded-xl text-white text-xl right-7">
            show saved data
           </button>
      {show&&<div  className="absolute  z-20 bg-white border min-w-[240px] flex flex-col">
              <button onClick={()=>{setShow(!show)}} className="text-3xl  text-black border ml-auto mr-7 mt-5">X</button>
              <Table dataSource={load.data} columns={columns} 
              onRow={(record) => ({
        onClick: () => {handelAddToForm(record as FormData);setShow(!show)},
      })}
 />
      </div>}
     {notification&&<div className="mb-auto relative p-10 w-fit bg-slate-400">
     {DeleteOne.isSuccess&&<p className="bg-green-500 text-white text-2xl"> record deleted </p>}
      {DeleteOne.isError&&<p className="bg-red-500 text-white text-2xl"> error while deleting the record </p>}
      <button onClick={()=>{setnotification(false)}} className="absolute top-3 right-3 text-3xl">X</button>
      </div>}
      <Form form={form} onFinish={handleSubmit} className="my-auto" >
        
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              name: e.target.value,
            }))
          }
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input
          type="email"
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              email: e.target.value,
            }))
          }
        />
      </Form.Item>

          
      <Form.Item name="phone" label="Phone">
        <Input
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              phone: e.target.value,
            }))
          }
        />
      </Form.Item>

      <Button  type="primary" htmlType="submit">
        Submit
      </Button>
     {/*  <Button  type="primary" onClick={handleSaveToLocalStorage}>
        Save 
      </Button> */}
      {/* <Button type="primary" onClick={handleLoadFromLocalStorage}>
        Load from localStorage
      </Button> */}
      <Button type="primary" onClick={handleSaveToDb}>
        Save to db
      </Button>
     {/*  <Button type="primary" onClick={handleLoadFromDb}>
        Load from db
      </Button> */}
      <br/>
      <button className="mt-5 border-black border-2  p-2 text-white" onClick={handleDeletAll}>Delet all from db</button>
    </Form>

      </main>
    </>
  );
};

export default Home;
