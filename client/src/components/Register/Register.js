import { useState } from 'react'
import axios from 'axios'


export default function Register (props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function validatePassword (password, confirmPassword) {
    return password === confirmPassword ? true : false
  }

  function submit () {
    console.log(firstName, lastName, email, password, confirmPassword)
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    }
    return axios.put('/api/users', { newUser }).then(result => result)
  }

  return (
    <div className='card col-12 col-lg-4 login-card mt-2 hv-center'>
      <form onSubmit={event => event.preventDefault()}>
        <div className='form-group text-left'>
          <label for='name'>First name</label>
          <input
            onChange={event => setFirstName(event.target.value)}
            type='text'
            name='name'
            id='name'
            required
          ></input>
        </div>
        <div className='form-group text-left'>
          <label for='name'>Last name</label>
          <input
            onChange={event => setLastName(event.target.value)}
            type='text'
            name='name'
            id='name'
            required
          ></input>
        </div>
        <div className='form-group text-left'>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input
            onChange={event => setEmail(event.target.value)}
            type='email'
            className='form-control'
            id='email'
            aria-describedby='emailHelp'
            placeholder='Enter email'
          />
          <small id='emailHelp' className='form-text text-muted'></small>
        </div>
        <div className='form-group text-left'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input
            onChange={event => setPassword(event.target.value)}
            type='password'
            className='form-control'
            id='password'
            placeholder='Password'
          />
        </div>
        <div className='form-group text-left'>
          <label htmlFor='exampleInputPassword1'>Confirm Password</label>
          <input
            onChange={event => setConfirmPassword(event.target.value)}
            type='password'
            className='form-control'
            id='confirmPassword'
            placeholder='Confirm Password'
          />
        </div>
        <button onClick={submit} type='submit' className='btn btn-primary'>
          Register
        </button>
      </form>
    </div>
  )
}
