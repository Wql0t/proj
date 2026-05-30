export const siteConfig = {
    title: "Frutta",
    description: "приложение для продажи и покупки вещей",
    NavItems: [
        {href: '/buy', label: 'Товары'},
        {href: '/admin', label: 'Админ-панель', adminOnly: true},
        {href: '/cart', label: 'Корзина'},
    ],
    
} as const