import React from "react";
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';



export default function RegisterForm() {
    return (
        <Form className="register-form">
            <Form.Item>
                <Input prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />} type="email" name="email" placeholder="Correo electronico" className="regster-form__input" />
            </Form.Item>
            <Form.Item>
                <Input prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />} type="password" name="password" placeholder="Contraseña" className="regster-form__input" />
            </Form.Item>
            <Form.Item>
                <Input prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />} type="password" name="repeatPassword" placeholder="Repetir contraseña" className="regster-form__input" />
            </Form.Item>
            <Form.Item>
                <Checkbox name="privacyPolicy">
                    He leido y acepto las politica de privacidad
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="register-form__button">
                    Crear cuenta
                </Button>
            </Form.Item>
        </Form>
    )
}