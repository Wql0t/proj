"use client"
import { Form, Input, Card, CardHeader, CardBody, Button, TableHeader, Table, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useState } from "react";

interface User {
    name: string,
    email: string,
    role: string,
    id: string,
    createdAt: string
}

const AdminPanel = () => {

    const [users, setUsers] = useState<User[]>([
        {
            id: '1',
            name: 'Админ',
            email: 'admin@gmail.com',
            role: 'admin',
            createdAt: new Date().toLocaleDateString()
        },
        {
            id: '1',
            name: '22',
            email: 'gdfg@gmail.com',
            role: 'user',
            createdAt: new Date().toLocaleDateString()
        }
    ])



      const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  })

    const [errors, setErrors] = useState<{[key: string]: string}>({})

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors : {[key: string]: string} = {}

    if(!formData.name.trim()) {
        newErrors.name = "Имя обязательно"
    }

    if(!formData.email.trim()) {
        newErrors.email = "Email обязателен"
    } 
    else if(!validateEmail(formData.email)) {
        newErrors.email = "Некорректный email"
    }
    else if(users.some(user => user.email === formData.email)) {
        newErrors.email = "Пользователь с таким email уже существует"
    }
    
        return Object.keys(newErrors).length === 0
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(!validateForm()) {
        return
    }

    const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        createdAt: new Date().toLocaleDateString()
    }

    setUsers([...users, newUser])

    setFormData({name: '', email: '', role: 'user'})

    setErrors({})
  }


    const handleDeleteUser = (userId: string) => {
        setUsers(users.filter(user => user.id !== userId))
    }

    return ( 
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-center mb-2.5">Админ панель</h1>
                <p className="text-center">Управление пользователями системы</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="w-full">
                    <CardHeader>
                        <h2 className="text-xl font-semibold blackc">Добавить пользователя</h2>
                    </CardHeader>
                    <CardBody>
                        <Form className="w-full" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <Input 
                                    label="Имя пользователя"
                                    placeholder="Введите имя"
                                    value={formData.name}
                                    classNames={{
                                        inputWrapper: 'bg-default-100',
                                        input: 'text-sm text-black focus: outline-none',
                                        label: 'text-black',
                                        
                                    }}
                                    onChange={(e) => setFormData({...formData, name: e.target.value })}
                                    isInvalid={!!errors.name}
                                    errorMessage={errors.name}
                                />
                                <Input 
                                    label="Email"
                                    placeholder="Введите почту"
                                    value={formData.email}
                                    classNames={{
                                        inputWrapper: 'bg-default-100',
                                        input: 'text-sm text-black focus: outline-none',
                                        label: 'text-black'
                                    }}
                                    onChange={(e) => setFormData({...formData, email: e.target.value })}
                                    isInvalid={!!errors.email}
                                    errorMessage={errors.email}
                                />
                                <div>
                                    <select
                                    value={formData.role}
                                     onChange={(e) => setFormData({...formData, role: e.target.value })}
                                     className="w-full border-grey rounded-lg bg-default  blackc"
                                    >
                                        <option value="user">Пользователь</option>
                                        <option value="admin">Админ</option>
                                        <option value="mod">Модератор</option>
                                    </select>
                                </div>

                                <Button color="primary" type="submit" className="w-full">
                                    Добавить пользователя
                                </Button>

                            </div>
                        </Form>
                    </CardBody>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <h2 className="text-xl font-semibold blackc">Список пользователей</h2>
                    </CardHeader>
                    <CardBody>
                        <div className="">
                            <Table>
                                <TableHeader>
                                    <TableColumn className="font-semibold blackc">ИМЯ</TableColumn>
                                    <TableColumn className="font-semibold blackc">EMAIL</TableColumn>
                                    <TableColumn className="font-semibold blackc">РОЛЬ</TableColumn>
                                    <TableColumn className="font-semibold blackc">ДАТА СОЗДАНИЯ</TableColumn>
                                    <TableColumn className="font-semibold blackc">ДЕЙСТВИЕ</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="blackc">{user.name}</TableCell>
                                            <TableCell className="blackc">{user.email}</TableCell>
                                            <TableCell>
                                                <span className={`{${user.role === "admin" ? "bg-red-200 text-red-700" : user.role === "moderator" ? "bg-blue-200 text-blue-600" : "bg-blue-200 text-blue-600"}`}>
                                                    {user.role === 'admin' ? 'Администратор' : user.role === 'mod' ? 'Модератор' : 'Пользователь'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="blackc">{user.createdAt}</TableCell>
                                            <TableCell>
                                                <Button color="danger" size="sm" onPress={() => handleDeleteUser(user.id)}>
                                                Удалить
                                                </Button>
                                                
                                                </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
     );
}
 
export default AdminPanel;