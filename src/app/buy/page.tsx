"use client"
import { Button } from "@heroui/react";
import {Card, CardBody, CardFooter, Image} from "@heroui/react";
interface CartItem {
    title: string,
    price: string,
    imag: string
}
const Buy = () => {
    const list = [
    {
      title: "Апельсин",
      img: "https://foodcity.ru/storage/products/October2018/6XZSr6ddCl6cxfo0UchP.jpg",
      price: "$8.50",
    },
    {
      title: "Апельсин Апельсин",
      img: "https://foodcity.ru/storage/products/October2018/6XZSr6ddCl6cxfo0UchP.jpg",
      price: "$5.50",
    },
    {
      title: "Яблоко",
      img: "data:image/jpeg;base64,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",
      price: "$5.50",
    },
    {
      title: "4",
      img: "https://foodcity.ru/storage/products/October2018/6XZSr6ddCl6cxfo0UchP.jpg",
      price: "$5.50",
    },
    {
      title: "5",
      img: "https://foodcity.ru/storage/products/October2018/6XZSr6ddCl6cxfo0UchP.jpg",
      price: "$5.50",
    },
  ];
  const AddToCart = (name: string, price: string, img: string): void => {
    const cartJson: string | null = localStorage.getItem('cart');
    const cart: CartItem[] = cartJson ? JSON.parse(cartJson) : [];
    cart.push({
        title: name,
        price: price,
        imag: img
    })

    localStorage.setItem('cart', JSON.stringify(cart));
  }
    return (
    <div className="mt-4 gap-3 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card  className="ggc" key={index} isPressable shadow="sm" onPress={() => AddToCart(item.title, item.price, item.img)}>
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.title}
              className="w-full object-cover h-[140px] mr-5"
              radius="lg"
              shadow="sm"
              src={item.img}
              width="100%"
            />
          </CardBody>
          <p className="text-start ml-3 text-default-400 pt-2 mr-3">{item.title}</p>
          <CardFooter className="text-small justify-between">
            
            <p className="text-default-500 pr-6">{item.price}</p>
            
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
 
export default Buy;