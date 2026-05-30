"use client"
import { Button, Card, CardBody, CardFooter, Image, Chip } from "@heroui/react";
import { api } from '@/lib/api';
import { ShoppingCart, Star, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface CartItem {
    title: string,
    price: string,
    imag: string
}

type AllergyRisk = 'low' | 'medium' | 'high';

interface AllergyInfo {
    level: AllergyRisk;
    note: string;
    triggers: string[];
}

interface Product {
    title: string;
    img: string;
    price: string;
    rating?: number;
    reviews?: number;
    inStock: boolean;
    allergy?: AllergyInfo;
}

const ALLERGY_RISK: Record<AllergyRisk, { fill: string; title: string; hint: string }> = {
    low: {
        fill: 'bg-emerald-500',
        title: 'Низкая вероятность реакции',
        hint: 'Для большинства аллергиков обычно переносится без проблем',
    },
    medium: {
        fill: 'bg-amber-400',
        title: 'Возможны единичные реакции',
        hint: 'У чувствительных людей иногда проявляется — стоит быть внимательнее',
    },
    high: {
        fill: 'bg-red-500',
        title: 'Выраженный риск для аллергиков',
        hint: 'Часто вызывает перекрёстные и пищевые реакции — соблюдайте осторожность',
    },
};

function AllergyIndicator({ allergy }: { allergy: AllergyInfo }) {
    const risk = ALLERGY_RISK[allergy.level];
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const updatePosition = useCallback(() => {
        const el = triggerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setCoords({ x: rect.left + rect.width / 2, y: rect.top - 10 });
    }, []);

    const show = () => {
        updatePosition();
        setOpen(true);
    };

    const hide = () => setOpen(false);

    const tooltip = open && typeof document !== 'undefined' && createPortal(
        <div
            role="tooltip"
            style={{ left: coords.x, top: coords.y }}
            className="fixed z-[9999] w-56 -translate-x-1/2 -translate-y-full rounded-lg bg-gray-900 text-white text-xs shadow-2xl p-3 pointer-events-none"
        >
            <p className="font-semibold text-sm leading-snug">{risk.title}</p>
            <p className="text-gray-300 mt-1 leading-relaxed">{risk.hint}</p>
            <p className="text-gray-400 mt-2 mb-1">Что может спровоцировать:</p>
            <ul className="space-y-0.5 text-gray-200">
                {allergy.triggers.map((t) => (
                    <li key={t} className="before:content-['•'] before:mr-1.5 before:text-gray-500">
                        {t}
                    </li>
                ))}
            </ul>
            {allergy.note && (
                <p className="text-gray-400 mt-2 pt-2 border-t border-gray-700 leading-relaxed">
                    {allergy.note}
                </p>
            )}
            <span className="absolute left-1/2 top-full -translate-x-1/2 border-[6px] border-transparent border-t-gray-900" />
        </div>,
        document.body,
    );

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                aria-label={risk.title}
                onMouseEnter={show}
                onMouseLeave={hide}
                onFocus={show}
                onBlur={hide}
                className={`shrink-0 w-5 h-5 rounded-full border-[2.5px] border-white shadow-[0_1px_4px_rgba(0,0,0,0.45)] cursor-help transition-transform hover:scale-110 ${risk.fill}`}
            />
            {tooltip}
        </>
    );
}

const Buy = () => {
    const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        const cartJson = localStorage.getItem('cart');
        if (cartJson) {
            const cart: CartItem[] = JSON.parse(cartJson);
            setAddedItems(new Set(cart.map(item => item.title)));
        }
    }, []);

    const submit2 = async () => {
        const res2 = await api.get('/buy/getProducts')
    };

    const list: Product[] = [
        {
            title: "Апельсин сладкий",
            img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRbffE9qjGqVo6w1N8VRKzsNvZl773pghIipPiY-QmjBXB4X3xzG_SsVoYE94sVlFWjJU6OeOKS0LB03tW7-yjsd48oIDx-KbLKb4QXhCNdGgad8Tzp-706",
            price: "$8.50",
            rating: 4.8,
            reviews: 124,
            inStock: true,
            allergy: {
                level: 'medium',
                note: 'Цитрусовые аллергены иногда пересекаются с пыльцой берёзы.',
                triggers: ['Cit s 1 (лимонен)', 'Cit s 2 (профилин)', 'эфирные масла кожуры'],
            },
        },
        {
            title: "Апельсин крупный",
            img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQiU14Sy4uvYZw1AeUE3Ht4_26-TsJt463bsxEVQ-wdfU1owZSuWLNhlVj5eA16jeGcg0Heg7Vmj1qYBxjM5CxxHHRs-gbN-h1wpPd9wGQw4_ROvy09AluQ",
            price: "$5.50",
            rating: 4.6,
            reviews: 89,
            inStock: true,
            allergy: {
                level: 'low',
                note: 'Реакции встречаются реже, чем на грейпфрут или мандарин.',
                triggers: ['Cit s 1', 'флавоноиды мякоти'],
            },
        },
        {
            title: "Яблоко красное",
            img: "data:image/jpeg;base64,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",
            price: "$5.50",
            rating: 4.9,
            reviews: 256,
            inStock: true,
            allergy: {
                level: 'high',
                note: 'Синдром «берёза–яблоко»: сырое яблоко часто не переносят аллергики на пыльцу.',
                triggers: ['Mal d 1 (белок, родственный берёзе)', 'Mal d 3 (липидный переносчик)', 'пектин'],
            },
        },
        {
            title: "Грейпфрут",
            img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTl4Ed6e7XMB8HuEnOQMzD2eJZ8aXoQENAlmssPdjE2RHTwU9iEU1FiocUCIy0asKkAyxTBKrOiOzoGRwB2o5kDdBgdJOzY7_O4zeAK285OD7RmRiijM0ePMg",
            price: "$7.90",
            rating: 4.7,
            reviews: 67,
            inStock: true,
            allergy: {
                level: 'high',
                note: 'Сочетание цитрусовых аллергенов и фурокумаринов усиливает чувствительность у части людей.',
                triggers: ['Cit s 1', 'фурокумарины', 'нарингин (горький флавоноид)'],
            },
        },
        {
            title: "Мандарины",
            img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTKoRm65MBx8ELa5Qr5A63aRP8C-typCkDLPVnrt4a5gH7xnZ6lTENJyCYvhaqxpDQn2s5wGrA-d4MY-9egjFg-njxnGTLSpeTs8t7YW9Q",
            price: "$6.50",
            rating: 4.5,
            reviews: 198,
            inStock: false,
            allergy: {
                level: 'medium',
                note: 'Тонкая кожура концентрирует эфирные масла — контакт с соком раздражает кожу.',
                triggers: ['Cit s 1', 'Cit s 3 (липидный переносчик)', 'лимонная кислота'],
            },
        },
    ];

    const AddToCart = (name: string, price: string, img: string): void => {
        const cartJson: string | null = localStorage.getItem('cart');
        const cart: CartItem[] = cartJson ? JSON.parse(cartJson) : [];
        
   
        const existingItem = cart.find(item => item.title === name);
        if (existingItem) {
      
            return;
        }
        
        cart.push({
            title: name,
            price: price,
            imag: img
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        setAddedItems(prev => new Set(prev).add(name));
        
       
        const btn = document.activeElement;
        if (btn) {
            btn.classList.add('scale-95');
            setTimeout(() => btn.classList.remove('scale-95'), 200);
        }
    };

    const isInCart = (title: string): boolean => {
        return addedItems.has(title);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
        
            <div className="mb-8 text-center">
           
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent mb-2">
                    Наши товары
                </h1>
                <p className="text-gray-500">Свежие фрукты напрямую от производителя</p>
            </div>

    
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {list.map((item, index) => (
                    <Card 
                        className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:z-10 rounded-2xl border-0" 
                        key={index} 
                        shadow="sm"
                    >
        
                        {!item.inStock && (
                            <div className="absolute top-3 right-3 z-10">
                                <Chip color="danger" variant="solid" size="sm" className="rounded-full">
                                    Нет в наличии
                                </Chip>
                            </div>
                        )}

         
                   

                        <CardBody className="overflow-visible p-0">
                            <div className="relative overflow-hidden rounded-t-2xl">
                                <Image
                                    alt={item.title}
                                    className="w-full object-cover h-[200px] transition-transform duration-500 group-hover:scale-110"
                                    radius="none"
                                    shadow="none"
                                    src={item.img}
                                    width="100%"
                                />

                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                            </div>
                        </CardBody>
                        
                        <div className="p-4">
                            <div className="mb-2">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1 flex-1 min-w-0">
                                        {item.title}
                                    </h3>
                                    {item.allergy && (
                                        <AllergyIndicator allergy={item.allergy} />
                                    )}
                                </div>

                                {item.rating && (
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-semibold text-gray-700">{item.rating}</span>
                                        <span className="text-xs text-gray-400">({item.reviews} отзывов)</span>
                                    </div>
                                )}
                            </div>
                            
                            <CardFooter className="p-0 pt-3 flex justify-between items-center">
                                <div>
                                    <p className="text-2xl font-bold text-black">{item.price}</p>
                                 
                                </div>
                                <Button 
                                    color={isInCart(item.title) ? "success" : "primary"}
                                    onPress={() => AddToCart(item.title, item.price, item.img)}
                                    variant={isInCart(item.title) ? "solid" : "ghost"}
                                    className={`rounded-full transition-all duration-300 ${
                                        !isInCart(item.title) && 'hover:scale-105 hover:shadow-lg'
                                    } ${isInCart(item.title) && 'opacity-80'}`}
                                    isDisabled={!item.inStock}
                                    startContent={<ShoppingCart size={16} />}
                                >
                                    {isInCart(item.title) ? "В корзине" : "В корзину"}
                                </Button>
                            </CardFooter>
                        </div>
                    </Card>
                ))}
            </div>

                      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-4">
                    <div className="inline-block p-3 bg-green-100 rounded-full mb-3">
                        <TrendingUp size={24} className="text-green-600" />
                    </div>
                    <h4 className="font-semibold text-blue-100">Свежие продукты</h4>
                    <p className="text-sm text-gray-500">Ежедневная поставка свежих фруктов</p>
                </div>
                <div className="text-center p-4">
                    <div className="inline-block p-3 bg-blue-100 rounded-full mb-3">
                        <ShoppingCart size={24} className="text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-blue-100">Быстрая доставка</h4>
                    <p className="text-sm text-gray-500">Доставка по всему городу за 2 часа</p>
                </div>
                <div className="text-center p-4">
                    <div className="inline-block p-3 bg-yellow-100 rounded-full mb-3">
                        <Star size={24} className="text-yellow-600" />
                    </div>
                    <h4 className="font-semibold text-blue-100">Гарантия качества</h4>
                    <p className="text-sm text-gray-500">100% свежесть и отличный вкус</p>
                </div>
            </div>
        </div>
    );
}

export default Buy;