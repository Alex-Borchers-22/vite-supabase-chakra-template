import { Box, Container, Heading, Text, Stack } from "@chakra-ui/react";
import { Avatar } from "../components/ui/avatar";
import { useSession } from "../context/SessionContext";

const HomePage = () => {
  const { session } = useSession();
  const user = session?.user;

  return (
    <Box bg="gray.900" minH="100vh" py={8}>
      <Container maxW="container.md">
        <Stack direction="column" gap={6} align="stretch" bg="gray.800" p={8} borderRadius="lg" boxShadow="lg">
          <Heading color="white" size="lg" mb={4}>User Profile</Heading>
          
          <Box display="flex" alignItems="center" gap={4}>
            <Avatar 
              size="xl"
              name={user?.email || undefined}
              src={user?.user_metadata?.avatar_url}
            />
            <Stack direction="column" gap={1} align="start">
              <Text color="gray.300" fontSize="sm">Email</Text>
              <Text color="white" fontSize="lg">{user?.email || "Not available"}</Text>
            </Stack>
          </Box>

          <Box>
            <Text color="gray.300" fontSize="sm">User ID</Text>
            <Text color="white" fontSize="md">{user?.id || "Not available"}</Text>
          </Box>

          <Box>
            <Text color="gray.300" fontSize="sm">Last Sign In</Text>
            <Text color="white" fontSize="md">
              {user?.last_sign_in_at 
                ? new Date(user.last_sign_in_at).toLocaleString() 
                : "Not available"}
            </Text>
          </Box>

          {user?.user_metadata && Object.keys(user.user_metadata).length > 0 && (
            <Box>
              <Text color="gray.300" fontSize="sm" mb={2}>Additional Information</Text>
              {Object.entries(user.user_metadata).map(([key, value]) => (
                <Box key={key} mb={2}>
                  <Text color="gray.400" fontSize="sm" textTransform="capitalize">
                    {key.replace(/_/g, " ")}
                  </Text>
                  <Text color="white" fontSize="md">{String(value)}</Text>
                </Box>
              ))}
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
