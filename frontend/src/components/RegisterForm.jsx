import { useForm } from 'react-hook-form';
import React, { useRef } from 'react';
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
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  async function onSubmit(values) {
    // TODO: redirect to / if registration is successful
    // TODO: Use token
    
    const requestOptions = {
      method: 'PUT'
    };

    const response = await fetch("/api/register?username=" + values.username + "&password=" + values.password, requestOptions);
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
      <FormControl isInvalid={errors.password_confirm}>
        <FormLabel htmlFor="password">Confirm Password</FormLabel>
        <Input
          id="password_confirm"
          placeholder="Confirm Password"
          type="password"
          {...register('password_confirm', {
            required: 'Password confirmation is required',
            validate: (value) =>
              value === password.current || 'Passwords do not match',
          })}
        />
        <FormErrorMessage>
          {errors.password_confirm && errors.password_confirm.message}
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
        <Link as={RouterLink} color="red" to="/login">
          Already a user?
        </Link>
      </Box>
    </form>
  );
}
