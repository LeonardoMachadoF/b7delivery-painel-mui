import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Product } from "@/types/Product";

const tmpProduct: Product = {
    id: 999,
    image: 'https://saopaulosecreto.com/wp-content/uploads/2022/10/Get-Burger-1024x683.jpg',
    category: {
        id: 12,
        name: 'Burguers'
    },
    name: 'Burguer Default',
    price: 35.3,
    description: "Um burguer padrão"
}

export const api = {
    login: async (email: string, password: string): Promise<{ error: string, token?: string }> => {
        return new Promise(resolve => setTimeout(() => {
            if (email !== "leo123@gmail.com") {
                resolve({
                    error: 'E-mail e/ou senha não batem.'
                });
            } else {
                resolve({
                    error: '',
                    token: '123'
                })
            }
        }, 1000))
    },
    forgotPassword: async (email: string): Promise<{ error: string }> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ error: '' })
            }, 1000)
        })
    },
    redefinePassword: async (password: string, token: string): Promise<{ error: string }> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ error: '' })
            }, 1000)
        })
    },
    getOrders: async (): Promise<Order[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const orders: Order[] = [];
                const statuses: OrderStatus[] = ['delivered', 'preparing', 'sent'];

                for (let i = 0; i < 6; i++) {
                    orders.push({
                        id: parseInt('12' + i),
                        status: statuses[Math.floor(Math.random() * 3)],
                        orderDate: '2023-01-03 18:30',
                        userId: '1',
                        username: 'andré',
                        shippingAddress: {
                            id: 43,
                            cep: '99999999',
                            address: 'Rua Auguts',
                            number: '1200',
                            neighborhood: "Itaim Branco",
                            city: 'São Paulo',
                            state: 'SP',
                            complement: 'AAAAA3'
                        },
                        shippingPrice: 12,
                        paymentType: 'card',
                        changeValue: 0,
                        cupom: 'BLA',
                        cupomDiscount: 2,
                        products: [
                            { qt: 2, product: tmpProduct },
                            { qt: 3, product: { ...tmpProduct, id: 88, name: "Burguer Novo" } },
                        ],
                        subtotal: 99,
                        total: 120
                    });
                }

                resolve(orders);
            }, 1000)
        })
    },
    changeOrderStatus: async (id: number, newStatus: OrderStatus) => {
        return true;
    }
}