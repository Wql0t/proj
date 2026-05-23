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
     const cartJson = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
    const items = cartJson ? JSON.parse(cartJson) : [];
       const [item, setItem] = useState<User[]>([
        {
            id: '1',
            name: 'gfdgf',
            price: '23',
            createdAt: new Date().toLocaleDateString()
        },
        {
            id: '2',
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
                <h1 className="text-3xl font-bold text-center mb-2.5 cw">Личный кабинет</h1>
                <p className="text-center cw">Управление вашими товарами</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="h-65">
                    <CardHeader>
                        <h2 className="text-xl font-semibold blackc">Добавить товар</h2>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit} className="">
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
                        </form>
                    </CardBody>
                </Card>
                 <Card className="h-full">
                    <CardHeader>
                        <h2 className="text-xl font-semibold blackc">Итоговый доход</h2>
                    </CardHeader>
                    <CardBody className="flex items-center justify-center p-0">
                        <div className="">
                            <div className="flex items-baseline justify-center gap-1">
                                <h1 className="text-7xl font-bold text-black tracking-tight">
                                    729
                                </h1>
                                <span className="text-5xl text-gray-400 font-medium">$</span>
                            </div>
                            <div className="mt-4 flex justify-center gap-1">
                                <div className="w-8 h-1 bg-green-500 rounded-full"></div>
                                <div className="w-8 h-1 bg-gray-600 rounded-full"></div>
                                <div className="w-8 h-1 bg-gray-600 rounded-full"></div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
        </div>
       
            </div>
     );
}
 
export default profile;