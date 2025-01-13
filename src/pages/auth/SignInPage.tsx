import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import supabase from "../../supabase";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";

const SignInPage = () => {
  const { session } = useSession();
  const [status, setStatus] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignInWithGoogle = async (response: any) => {
    setStatus("Logging in with Google...");
    try {
      const decoded: any = jwtDecode(response.credential);
      
      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
        nonce: decoded.nonce
      });
      
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
    setStatus("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Logging in...");
    const { error } = await supabase.auth.signInWithPassword({
      email: formValues.email,
      password: formValues.password,
    });
    if (error) {
      alert(error.message);
    }
    setStatus("");
  };

  if (session) return <Navigate to="/home" />;

  return (
    <Box bg="gray.900" minH="100vh">
      <Container maxW="md" py={12}>
        <Box bg="gray.800" p={8} borderRadius="lg" boxShadow="lg">
          <Text fontSize="2xl" fontWeight="bold" color="white" mb={8}>
            Sign In
          </Text>
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <Box>
              <Box mb={4}>
                <Text color="gray.300" mb={2}>Email</Text>
                <Input
                  name="email"
                  onChange={handleInputChange}
                  type="email"
                  placeholder="your@email.com"
                  bg="gray.700"
                  border="none"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                />
              </Box>
              <Box mb={6}>
                <Text color="gray.300" mb={2}>Password</Text>
                <Input
                  name="password"
                  onChange={handleInputChange}
                  type="password"
                  placeholder="Enter your password"
                  bg="gray.700"
                  border="none"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                />
              </Box>
              <Button type="submit" colorScheme="purple" size="lg" w="100%" mb={4}>
                Sign In
              </Button>
              
              <Flex align="center" mb={4}>
                <Box flex="1" h="1px" bg="gray.600" />
                <Text px={3} color="gray.400">Or Sign In Using</Text>
                <Box flex="1" h="1px" bg="gray.600" />
              </Flex>

              <Flex justify="center" mb={4}>
                <GoogleLogin
                  onSuccess={handleSignInWithGoogle}
                  onError={() => {
                    alert('Login Failed');
                  }}
                  type="standard"
                  shape="circle"
                  useOneTap
                />
              </Flex>

              <Flex justify="center">
                <Text color="gray.400">
                  Don't have an account?{" "}
                  <Link to="/auth/sign-up">
                    <Text as="span" color="purple.400" _hover={{ textDecoration: "underline" }}>
                      Sign Up
                    </Text>
                  </Link>
                </Text>
              </Flex>
              {status && (
                <Text color="gray.300" textAlign="center" mt={4}>
                  {status}
                </Text>
              )}
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default SignInPage;
