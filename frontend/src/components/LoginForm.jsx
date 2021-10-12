import { useForm } from 'react-hook-form';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Link,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    // TODO: connect with login API endpoint, redirect to / if auth is successful
    const requestOptions = {
      method: 'POST'
    };

    const response = await fetch("/api/login?username=" + values.username + "&password=" + values.password, requestOptions);
    const body = await response.json();
    console.log(response.json());
    return new Promise((resolve) => {
      setTimeout(() => {
            alert(JSON.stringify(body, null));
            resolve();
          }, 3000);
    });
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
