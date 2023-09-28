import React from "react";
import Image from "next/image";
import { /* useSession, */ signIn /*, signOut */ } from "next-auth/react";
import {
  Button,
  TextFieldInput,
  Text,
  Flex,
  Theme,
  Heading,
  Link,
} from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";

export default function Login() {
  const handleClick = async () => {
    await signIn("google");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-max w-96 flex-col items-center rounded-md border-2 border-neutral-300 bg-neutral-200 px-4 py-4 md:px-8 md:py-8">
        <Theme accentColor="green">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-neutral-1000 text-center font-cursive text-2xl font-bold">
              CookBookie
            </h2>
          </div>
          <div className="mt-6 w-full">
            <Flex direction="column" gap="4" className="items-center">
              <Form.Root className="w-full">
                <Flex direction="column" gap="4" className="items-center">
                  <Form.Field className="w-full" name="email">
                    <div className="flex justify-between">
                      <Form.Label>Email</Form.Label>
                      <Form.Message match="valueMissing">
                        <Text color="red">Please enter your email</Text>
                      </Form.Message>
                      <Form.Message match="typeMismatch">
                        <Text color="red">Please enter a valid email</Text>
                      </Form.Message>
                    </div>
                    <Form.Control asChild>
                      <TextFieldInput size="3" required />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field className="w-full" name="password">
                    <div className="flex justify-between">
                      <Form.Label>Password</Form.Label>
                      <Form.Message match="valueMissing">
                        <Text color="red">Please enter your password</Text>
                      </Form.Message>
                    </div>
                    <Form.Control asChild>
                      <TextFieldInput size="3" required />
                    </Form.Control>
                  </Form.Field>
                  <Form.Submit className="w-full">
                    <Button variant="solid" size="3" className="w-full">
                      Sign In
                    </Button>
                  </Form.Submit>
                  <Link weight="medium">Forgot Password?</Link>
                </Flex>
              </Form.Root>
              <Heading className="w-full text-center">or</Heading>
              <Button onClick={void handleClick} size="3" className="w-full">
                <Image src="" alt="Google Logo" />
                Placeholder Continue with Google
              </Button>
              <div>
                <Text>Don&apos;t have an accounts? </Text>

                <Link>Register here</Link>
              </div>
            </Flex>
          </div>
        </Theme>
      </div>
    </div>
  );
}
