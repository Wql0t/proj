"use client"
import { Card, CardBody, CardFooter, Image, Button } from "@heroui/react";

interface CartItem {
    title: string,
    price: string,
    imag: string
}
const Cart = () => {
    const cartJson = localStorage.getItem('cart')
    const items = cartJson ? JSON.parse(cartJson) : [];
    const DeleteCard = (name: string) => {
        const cartJson: string | null = localStorage.getItem('cart');
    const cart: CartItem[] = cartJson ? JSON.parse(cartJson) : []; 

    }
    return (
      
    <div className="mt-4 gap-3 grid grid-cols-2 sm:grid-cols-4">
        
        {items.map((item: { title: string, price: string, imag: string }, index: number) => (
            <Card className="ggc" key={index} isPressable shadow="sm" onPress={() => console.log(item.title)}>
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
                <p className="text-start mt-3 ml-3 cw">{item.title} </p>
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