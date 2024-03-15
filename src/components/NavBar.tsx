import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/square-hm-logo-design-vector-isolated-white-background-286936945.jpg";

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} boxSize="60px"></Image>
      <Text>NavBar</Text>
    </HStack>
  );
};

export default NavBar;
