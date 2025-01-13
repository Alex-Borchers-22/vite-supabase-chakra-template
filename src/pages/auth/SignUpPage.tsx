import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import supabase from "../../supabase";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FiMail } from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SignUpPage = () => {
  const { session } = useSession();
  if (session) return <Navigate to="/home" />;

  const [status, setStatus] = useState("");
  const [formValues, setFormValues] = useState({
    email: "amb035@morningside.edu",
    password: "password",
  });
  const [showValidateWarning, setShowValidateWarning] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Creating account...");
    const { error } = await supabase.auth.signUp({
      email: formValues.email,
      password: formValues.password,
    });
    if (error) {
      alert(error.message);
    } else{
      setShowValidateWarning(true);
    }
    setStatus("");
  };

  const handleSignUpWithGoogle = async (response: any) => {
    setStatus("Signing up with Google...");
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

  return (
    <Box bg="gray.900" minH="100vh">
      {!showValidateWarning ? (
        <Container maxW="md" py={12}>
          <Box bg="gray.800" p={8} borderRadius="lg" boxShadow="lg">
            <Text fontSize="2xl" fontWeight="bold" color="white" mb={8}>
            Sign Up
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
                Create Account
              </Button>
              <Flex align="center" mb={4}>
                <Box flex="1" h="1px" bg="gray.600" />
                <Text px={3} color="gray.400">Or Sign Up Using</Text>
                <Box flex="1" h="1px" bg="gray.600" />
              </Flex>
              <Flex justify="center" mb={4}>
                <GoogleLogin
                  onSuccess={handleSignUpWithGoogle}
                  onError={() => {
                    alert('Sign up Failed');
                  }}
                  type="standard"
                  shape="circle"
                  useOneTap
                />
              </Flex>
              <Flex justify="center">
                <Text color="gray.400">
                  Already have an account?{" "}
                  <Link to="/auth/sign-in">
                    <Text as="span" color="purple.400" _hover={{ textDecoration: "underline" }}>
                      Sign In
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
      ) : (
        <Container maxW="md" py={12}>
          <Flex direction="column" align="center" textAlign="center">
            {/* <Icon as={FiMail} boxSize={12} color="purple.400" mb={6} /> */}
            <Icon boxSize={12} color="purple.400" mb={6}>
              <FiMail />
            </Icon>
            <Text fontSize="3xl" fontWeight="bold" color="white" mb={4}>
              Check Your Email
            </Text>
            <Text color="gray.400" fontSize="lg" mb={6}>
              We've sent you a verification link to your email address. Please click the link to activate your account.
            </Text>
            <Text color="gray.500" fontSize="sm">
              Can't find the email? Check your spam folder or{" "}
              <Button variant="ghost" colorScheme="purple" size="sm" onClick={() => window.location.reload()}>
                click here to resend
              </Button>
            </Text>
          </Flex>
        </Container>
      )}
    </Box>
  );
};

export default SignUpPage;
