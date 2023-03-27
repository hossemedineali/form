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
    setNotification('Data saved to localStorage')
  };
  const handleSaveToDb=()=>{
    setNotification('')
    save.mutate({...form.getFieldsValue()})
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
            <br/>
      <Button  type="primary" onClick={handleSaveToLocalStorage}>
        Save to localStorage
      </Button>
      <br/>
      <Button type="primary" onClick={handleLoadFromLocalStorage}>
        Load from localStorage
      </Button>
          <br/>
      <Button type="primary" onClick={handleSaveToDb}>
        Save to db
      </Button>
      <br/>
      <Button type="primary" onClick={handleLoadFromDb}>
        Load from db
      </Button>
    </Form>

      </main>
    </>
  );
};

export default Home;
