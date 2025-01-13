import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import supabase from "@/supabase";

export default function Navbar() {
  const { session } = useSession();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <Box bg="gray.900" px={4} borderBottom="1px" borderColor="gray.700">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link to="/">
          <Text fontSize="xl" fontWeight="bold" color="purple.400">
            Template
          </Text>
        </Link>

        <Flex gap={4} alignItems="center">
          {session ? (
            <Button
              variant="ghost"
              color="gray.300"
              _hover={{ bg: "gray.700" }}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Link to="/auth/sign-in">
                <Button variant="ghost" color="gray.300" _hover={{ bg: "gray.700" }}>
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/sign-up">
                <Button colorScheme="purple">Sign Up</Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
} 