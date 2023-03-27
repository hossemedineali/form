import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";

type FormData = {
  name: string;
  email: string;
  phone?: string;
};


import { api } from "~/utils/api";

const Home: NextPage = () => {
 // const hello = api.example.hello.useQuery({ text: "from tRPC" });
 const load=api.example.load.useQuery()
 const save=api.example.save.useMutation() 
 const [form] = Form.useForm();
  
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" });
  const [notification,setNotification]=useState("")
  const handleSubmit = () => {
    console.log(formData);
  };
  const handleSaveToLocalStorage = () => {
    setNotification('')
    localStorage.setItem("formData", JSON.stringify(form.getFieldsValue()));
    console.log(form.getFieldsValue())
    setNotification('Data saved to localStorage')
  };
  const handleSaveToDb=async()=>{
    setNotification('')
   await save.mutate({...form.getFieldsValue()})
   await load.refetch()
    if(save.isSuccess){
      setNotification('data saved to db')
      
    }
    if(save.isError){
      setNotification('Error while saving data to the db')
    }
    console.log(save.data)
   
  }

  const handleLoadFromDb=()=>{
    setNotification('')
    setNotification('')
         load.refetch()
         form.setFieldsValue(load.data)
         console.log('data from database',load.data)
         if(load.data){
          setNotification('data loaded from db')
         }
         if(!load.data){
          setNotification('error loading data from')
         }
         
  }

const handelAddToForm=(e:FormData)=>{
      form.setFieldsValue(e)
}
  const handleLoadFromLocalStorage = () => {
    console.log('log handler run')
    const savedFormData = localStorage.getItem("formData");
    console.log('localstrorage data',savedFormData)
  if (savedFormData) {
    const parsedData = JSON.parse(savedFormData);
   /*  setFormData((prevData) => ({
      ...prevData,
      ...parsedData,
    })); */
    form.setFieldsValue(parsedData)
  }

   // console.log(formData)
  };

  /* useEffect(() => {
    //handleLoadFromLocalStorage();
    //console.log("form data from use effect",formData)
  }, [formData]); */

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-800">
      <p className="text-xl">{notification}</p>
      <div className="w-full h-40 mb-5 min-h-40 bg-slate-300 flex overflow-x-auto">
        {load.data?.map((item,index)=>{
          return <div key={index} onClick={()=>{handelAddToForm({name:item.name,email:item.email ,phone:item.phone as string})}} className="border-2 border-black w-fit h-fit p-2 " >
                <p>name: {item.name}</p>
                <p>email: {item.email}</p>
                <p>phone: {item.phone}</p>
             </div>
        })}
      </div>

      <Form form={form} onFinish={handleSubmit} initialValues={formData} >
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
    </Form>

      </main>
    </>
  );
};

export default Home;
