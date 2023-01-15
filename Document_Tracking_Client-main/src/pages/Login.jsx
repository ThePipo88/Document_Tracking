import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { Layout, Tabs } from "antd";
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import Swal from 'sweetalert2';
import axios from "axios";
import Cookies from "universal-cookie";


function Login() {

	const { Content } = Layout;

    const [body, setBody] = useState({ nickname: '', password: '' })

	const navigate = useNavigate();

	const handleChange = e => {
		setBody({
			...body,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = () => {

		if(body.nickname != '' && body.password != ''){

			axios.get('http://localhost:3977/api/v1/usuarios/obtener/usuario/login/'+body.nickname+'/'+body.password)
		.then(({data}) => {


			const cookies = new Cookies();

			cookies.set('nombreUsuario', data.user[0].nombre_usuario, {path: '/'});
            cookies.set('contrasena', data.user[0].contrasena, {path: '/'});
			cookies.set('organizacion_id', data.user[0].organizacion_id, {path: '/'});
			cookies.set('usuarioAdminId', data.user[0]._id, {path: '/'});

			navigate("/admin");

		}).catch(({response}) => {

			if(response.status == "500"){
				Swal.fire({
					title: 'Usuario o contraseña incorrectas',
					icon: 'warning',
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Aceptar'
				  }).then((result) => {
					
				  })
			}else if(response.status == "400"){
				Swal.fire({
					title: 'Se produjo un error',
					icon: 'warning',
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Aceptar'
				  }).then((result) => {
					
				  })
			}
		   })

		}else{
			Swal.fire({
				title: 'Faltan campos por ingresar',
				icon: 'warning',
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Aceptar'
			  }).then((result) => {
				
			  })
		}
	}

    return (
		
        <Layout className="root">
			<CssBaseline />
			<Content className="log-in__content">
			<Container component={Paper} elevation={5} maxWidth='xs' className="container_lg">
				<div className={"div_lg"}>
					<Avatar className="avatar_lg">
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>Iniciar Sesion</Typography>
					<form >
						<TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							label='Usuario'
							name='nickname'
							value={body.nickname}
							onChange={handleChange}
						/>
						<TextField
							fullWidth
							type='password'
							color='primary'
							margin='normal'
							variant='outlined'
							label='Contraseña'
							name='password'
							value={body.password}
							onChange={handleChange}
						/>
						
						<Button
							fullWidth
							variant='contained'
							color='secondary'
							onClick={() => onSubmit()}
						>
							Inisiar Sesion
						</Button>
						<Link to="/singIn"> <div className='nav-text'> <span>¿No tienes cuenta? Create una ahora!</span></div>
                </Link>
					</form>
				</div>
			</Container>
			</Content>
		</Layout>
    )
}

export default Login;