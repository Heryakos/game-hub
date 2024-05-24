import React, { useState } from "react";
import {
  SimpleGrid,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import useGames from "../hooks/useGames";
import { GameQuery } from "../App";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  const { data, error, isLoading } = useGames(gameQuery);
  const [isFourByFour, setIsFourByFour] = useState(true);
  const Skeleton = [1, 2, 3, 4, 5, 6];
  const showGridToggle = useBreakpointValue({ base: false, md: true });

  const toggleGrid = () => {
    setIsFourByFour((prev) => !prev);
  };
  if (error) return <Text>{error}</Text>;
  return (
    <React.Fragment>
      {error && <Text>{error}</Text>}
      {showGridToggle && (
        <Flex justifyContent="flex-start" position="relative" top={0} p={2}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Toggle Grid"
              icon={<TriangleDownIcon />}
            />
            <MenuList>
              <MenuItem onClick={toggleGrid}>
                {isFourByFour ? "1x1" : "4x4"}
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
      <Box h="calc(100vh - 40px)" overflowY="auto">
        <SimpleGrid
          columns={isFourByFour ? { sm: 1, md: 2, lg: 3, xl: 4 } : 1}
          padding="10px"
          spacing={6}
        >
          {isLoading &&
            Skeleton.map((Skeleton) => (
              <GameCardContainer key={Skeleton}>
                <GameCardSkeleton />
              </GameCardContainer>
            ))}
          {data.map((game) => (
            <GameCardContainer key={game.id}>
              <GameCard game={game} />
            </GameCardContainer>
          ))}
        </SimpleGrid>
      </Box>
    </React.Fragment>
  );
};

export default GameGrid;
