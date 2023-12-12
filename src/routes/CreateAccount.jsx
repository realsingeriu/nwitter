import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { FirebaseError } from 'firebase/app';
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
  errorMessageToKorean,
} from '../components/auth-components';
import GithubButton from '../components/GithubButton';

export default function CreateAccount() {
  const navigate = useNavigate(); //네비객체
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null); //에러 초기화
    if (isLoading || name === '' || email === '' || password === '') return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      console.log(credentials.user);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        //console.log(e.code, e.message);
        setError(errorMessageToKorean(e));
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>가입하기 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          value={password}
          name="password"
          placeholder="Password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? 'Loading...' : 'Create Account'} />
      </Form>
      {error && <Error>{error}</Error>}
      <Switcher>
        이미 계정이 있습니까? <Link to="/login">로그인 &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
