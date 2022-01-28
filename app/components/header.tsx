import { HamburgerIcon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	IconButton,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spacer,
} from '@chakra-ui/react';

function Logo() {
	return (
		<Box boxSize="sm">
			<Image src="/LogoGrey.png" alt="The C3 Church - Home" />
		</Box>
	);
}

export default function Header() {
	return (
		<Flex p={5} width="100%" height={120}>
			<Logo />
			<Spacer />
			<Menu>
				<MenuButton
					as={IconButton}
					aria-label="Options"
					icon={<HamburgerIcon />}
					variant="outline"
				/>
				<MenuList>
					<MenuItem>Messages</MenuItem>
					<MenuItem>Series</MenuItem>
					<MenuItem>Speakers</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
}
