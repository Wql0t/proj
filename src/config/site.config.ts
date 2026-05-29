export const siteConfig = {
    title: "SellAndBuy",
    description: "приложение для продажи и покупки вещей",
    NavItems: [
        {href: '/buy', label: 'Товары'},
        {href: '/admin', label: 'Админ-панель', adminOnly: true},
        {href: '/cart', label: 'Корзина'},
    ],
    
} as const