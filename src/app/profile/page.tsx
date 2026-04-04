'use client'
import { Card, CardHeader, CardBody, Form, Input, Button, Image, CardFooter } from "@heroui/react";
import { useState } from "react";
interface User {
    name: string,
    price: string,
    id: string,
    createdAt: string
}

interface Item {
    title: string,
    price: string,
    imag: string
}
 



const profile = () => {
     const cartJson = localStorage.getItem('cart')
    const items = cartJson ? JSON.parse(cartJson) : [];
       const [item, setItem] = useState<User[]>([
        {
            id: '1',
            name: 'gfdgf',
            price: '23',
            createdAt: new Date().toLocaleDateString()
        },
        {
            id: '1',
            name: 'dfggfg',
            price: '43',
            createdAt: new Date().toLocaleDateString()
        }
    ])



      const [formData, setFormData] = useState({
    name: '',
    price: ''
  })





  const validateForm = () => {
    const newErrors : {[key: string]: string} = {}

    if(!formData.name.trim()) {
        newErrors.name = "Название обязательно"
    }

    if(!formData.price.trim()) {
        newErrors.price = "Цена обязателена"
    } 


    
        return Object.keys(newErrors).length === 0
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(!validateForm()) {
        return
    }

    const NewItem: User = {
        id: Date.now().toString(),
        name: formData.name,
        price: formData.price,
        createdAt: new Date().toLocaleDateString()
    }

    setItem([...item, NewItem])

    setFormData({name: '', price: ''})

  }
    return ( 
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-center mb-2.5">Личный кабинет</h1>
                <p className="text-center">Управление вашими товарами</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="h-65">
                    <CardHeader>
                        <h2 className="text-xl font-semibold blackc">Добавить товар</h2>
                    </CardHeader>
                    <CardBody>
                        <Form className="" >
                            <div className="space-y-4">
                                <Input 
                                    label="Название"
                                    placeholder="Введите имя"
                                    value={formData.name}
                                    classNames={{
                                        inputWrapper: 'bg-default-100',
                                        input: 'text-sm text-black focus: outline-none',
                                        label: 'text-black',
                                        
                                    }}
                                    onChange={(e) => setFormData({...formData, name: e.target.value })}
    
                                />
                                <Input 
                                    label="Цена"
                                    placeholder="Введите цену"
                                    value={formData.price}
                                    classNames={{
                                        inputWrapper: 'bg-default-100',
                                        input: 'text-sm text-black focus: outline-none',
                                        label: 'text-black'
                                    }}
                                    onChange={(e) => setFormData({...formData, price: e.target.value })}

                                />
                                

                                <Button color="primary" type="submit" className="w-full">
                                    Добавить товар
                                </Button>

                            </div>
                        </Form>
                    </CardBody>
                </Card>
                 <Card className="">
                    <CardHeader>
                        <h2 className="text-xl font-semibold blackc">Итоговый доход</h2>
                    </CardHeader>
                    <CardBody>
                        <div className="">
                            <h1 className="blackc">729$</h1>
                        </div>
                    </CardBody>
                </Card>
                {/* <Card className="w-full bgm">
                    <CardHeader> */}
                        
                    {/* </CardHeader>
                    <CardBody> */}
                     
        </div>
          <h2 className="text-xl font-semibold">Список ваших товаров</h2>
           <div className="mt-4 gap-3 grid grid-cols-4 sm:grid-cols-10">
                  
                            
                            {items.map((item: { title: string, price: string, imag: string }, index: number) => (
            <Card className="ggc " key={index} isPressable shadow="sm" onPress={() => console.log(item.title)}>
                <CardBody className="overflow-visible p-0">
                    <Image
                        alt={item.title}
                        className="w-full object-cover h-[140px]"
                        radius="lg"
                        shadow="sm"
                        src={item.imag}
                        width="100%"
                    />
                </CardBody>
                <p className="text-start mt-3 ml-3">{item.title} </p>
                <CardFooter className="text-small justify-between">

                    <p className="text-default-500">{item.price}</p>
                </CardFooter>
            </Card>
        ))}
                        </div>
                    {/* </CardBody> */}
                {/* </Card> */}
               
            </div>
     );
}
 
export default profile;