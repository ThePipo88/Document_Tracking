import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { Layout, Tabs, Checkbox } from "antd";
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { FontSizeOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import axios from "axios";


function SingIn() {

	const { Content } = Layout;

    const [body, setBody] = useState({ nombre: '', descripcion: '', tipoOrganizacion: '', correo: '', contrasena: '' , repContra: ''})

	const navigate = useNavigate();

	const handleChange = e => {
		setBody({
			...body,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = () => {
		if(body.nombre != '' && body.descripcion != '' && body.tipoOrganizacion != '' && body.correo != '' && body.contrasena != '' && body.repContra != ''){

			const user = {
				nombre_org: body.nombre,
                descripcion_org: body.descripcion,
                tipo_org: body.tipoOrganizacion,
                correo_org: body.correo,
			}

			axios.post('http://localhost:3977/api/v1/organizacion/crearOrganizacion',user)
            .then(({data}) => {

				registraUsuario(body.nombre, body.contrasena, data.user._id);

				Swal.fire(
					'¡Organizacion registrada con exito!',
					'Se redireccionara a el login para iniciar sesion',
					'success'
				  ).then((result) => {
				      navigate("/login");
				})
            }).catch(({response}) => {

				if(response.status == "500"){
					Swal.fire({
						title: 'Organizacion o correo ingresado ya existentes',
						icon: 'warning',
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Aceptar'
					  }).then((result) => {
						
					  })
				}else if(response.status == "500"){
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
				title: 'Faltan datos por ingresar',
				icon: 'warning',
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Aceptar'
			  }).then((result) => {
				
			  })
		}
	}


	function registraUsuario(nomb, contra, orgId){

		const user = {
			nombre_usuario: nomb,
            rol: 'Administrador',
            contrasena: contra,
            organizacion_id: orgId
		}

		axios.post('http://localhost:3977/api/v1/usuarios/registrar/usuario',user)
            .then(({data}) => {

            }).catch(({response}) => {
				
            })
	}
	

    return (
		
        <Layout className="root-sing-in">
			<CssBaseline />
			<Content className="sign-in__content">
			<Container component={Paper} elevation={5} maxWidth='xs' className="container_lg">
				<div className={"div_lg"}>
					<Avatar className="avatar_lg">
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>Registro</Typography>
					<form >
                        <div className='div_form'>
                        <TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							label='Nombre Organizacion'
							name='nombre'
							value={body.nombre}
							onChange={handleChange}
                            inputProps = {{style: {fontSize: 14}}}
						/>
                        <div>
                        </div>
						<TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							label='Descripcion'
							name='descripcion'
							value={body.descripcion}
							onChange={handleChange}
                            inputProps = {{style: {fontSize: 14}}}
						/>
                        </div>
						<div className='div_form'>
                        <TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							label='Tipo organizacion'
							name='tipoOrganizacion'
							value={body.tipoOrganizacion}
							onChange={handleChange}
                            inputProps = {{style: {fontSize: 14}}}
						/>
                        <div>
                        </div>
                        <TextField
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							label='Correo'
							name='correo'
							value={body.correo}
							onChange={handleChange}
                            inputProps = {{style: {fontSize: 14}}}
						/>
                        </div>
                        <div className='div_form'>
                        <TextField
							fullWidth
							type='password'
							color='primary'
							margin='normal'
							variant='outlined'
							label='Contraseña'
							name='contrasena'
							value={body.contrasena}
							onChange={handleChange}
                            inputProps = {{style: {fontSize: 14}}}
						/>
                        <div>
                        </div>
						<TextField
							fullWidth
							type='password'
							color='primary'
							margin='normal'
							variant='outlined'
							label='Repetir contraseña'
							name='repContra'
							value={body.repContra}
							onChange={handleChange}
                            inputProps = {{style: {fontSize: 14}}}
						/>
                        </div>
                        <div className='nav-text' style={{marginTop: "12px"}}> <Checkbox name="privacyPolicy">
                    He leido y acepto las politica de privacidad
                </Checkbox></div>
                        
						<Button
							fullWidth
							variant='contained'
							color='secondary'
							onClick={() => onSubmit()}
						>
							Registrar organizacion
						</Button>
                        <Link to="/login"> <div className='nav-text'> <span>¿Ya tienes una cuenta? Inisia sesion</span></div>
                </Link>
					</form>
				</div>
			</Container>
			</Content>
		</Layout>
    )
}

export default SingIn;