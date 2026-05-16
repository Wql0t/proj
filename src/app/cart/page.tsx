"use client"
import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";
import { useEffect, useState } from "react";
import {api} from '@/lib/api';
interface CartItem {
    title: string,
    price: string,
    imag: string
}

const Cart = () => {
    const [items, setItems] = useState([])
    
    useEffect(() => {
        const cartJson = localStorage.getItem('cart')
        setItems(cartJson ? JSON.parse(cartJson) : [])
    }, [])
    
    const DeleteCard = (title: string) => {
        const cartJson = localStorage.getItem('cart')
        const itemsArray = cartJson ? JSON.parse(cartJson) : []
        const updated = itemsArray.filter((item: any) => item.title !== title)
        localStorage.setItem('cart', JSON.stringify(updated))
        setItems(updated)
    }
const sumbit = async(title2: string, price2: string)=>{
        const res = await api.post('/buy/buyThis',{title: title2, price: price2});

        console.log(res.data.status)
    } ;
    return (
        <div className="mt-4 gap-3 grid grid-cols-2 sm:grid-cols-4">
            {items.map((item: { title: string, price: string, imag: string }, index: number) => (
                <Card className="ggc" key={index} isPressable shadow="sm" onPress={() => sumbit(item.title, item.price)}>
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
                    <p className="text-start mt-3 ml-3 cw">{item.title}</p>
                    <CardFooter className="text-small justify-between">
                        <Button color="primary" onPress={() => DeleteCard(item.title)} variant="ghost" className="mr-5">Удалить</Button>
                        
                        <p className="text-default-500">{item.price}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export default Cart;