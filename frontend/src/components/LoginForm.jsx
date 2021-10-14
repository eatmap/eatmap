import { useForm } from 'react-hook-form';
import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  Box,
  Link,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';

import { login } from '../actions/authentication';
import { showErrorMessage, showSuccessMessage } from '../utils/toast';
import { saveJWT } from '../utils/token';

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const history = useHistory();

  async function onSubmit(values) {
    const { username, password } = values;

    try {
      const token = await login(username, password);
      saveJWT(token);
      showSuccessMessage('Successfully logged in');
      history.push('/');
    } catch (e) {
      showErrorMessage(e.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.username}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          placeholder="Username"
          type="text"
          {...register('username', {
            required: 'Username is required',
          })}
        />
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          placeholder="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Box
        display="flex"
        alignItems="center"
        mt={4}
        justifyContent="space-between"
      >
        <Button colorScheme="red" isLoading={isSubmitting} type="submit">
          Submit
        </Button>
        <Link as={RouterLink} color="red" to="/register">
          Not a user?
        </Link>
      </Box>
    </form>
  );
}
