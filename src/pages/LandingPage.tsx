import { Box, Heading, Text, Button, VStack, Container } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/auth/sign-up');
  }

  return (
    <Container maxW="container.xl" centerContent py={16}>
      <VStack textAlign="center">
        <Heading as="h1" size="3xl" color="purple.400">
          Welcome to Template
        </Heading>
        <Text fontSize="xl" maxW="2xl">
          This is a template - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
        </Text>
        <Box>
          <Button onClick={handleNavigate} bg="purple.600" color="white" _hover={{ bg: "purple.700" }} mr={4}>
            Get Started
          </Button>
          <Button variant="outline" color="purple.400" borderColor="purple.400">
            Learn More
          </Button>
        </Box>
      </VStack>
    </Container>
  )
}

export default LandingPage
