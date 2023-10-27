import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, HStack, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Dashboard() {
    const tasks = useLoaderData()

    const deletetask = async (id) => {
        const res2 = await fetch(`/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const deletedata = await res2.json();
        console.log(deletedata);
        if (res2.status === 404 || !deletedata) {
            console.log("deleted");
        }
        else {
            alert("Task deleted!!!");
            getdata();
        }

    }

    const user = useContext(UserContext);

    if (user === 'admin') return (
        <SimpleGrid spacing={10} minChildWidth="300px">



            {tasks && tasks.map(task => (
                <Card key={task.id} borderTop="8px" borderColor="purple.400" bg="white" >
                    <CardHeader>
                        <Flex gap={5}>
                            <Avatar src={task.img} />
                            <Box>
                                <Heading as="h3" size="sm">{task.title}</Heading>
                                <Text> by {task.author}</Text>
                            </Box>
                        </Flex>
                    </CardHeader>
                    <CardBody color="gray.500">
                        <Text>{task.description}</Text>
                    </CardBody>

                    <Divider borderColor="gray.200" />

                    <CardFooter>
                        <HStack>
                            <NavLink to={`tasks/${task._id}`}>
                                <Button variant="ghost" leftIcon={<EditIcon />}></Button>
                            </NavLink>
                            <NavLink to={`tasks/${task._id}`}>
                                <Button variant="ghost" leftIcon={<ViewIcon />}></Button>
                            </NavLink>
                            <Button variant="ghost" onClick={() => deletetask(task._id)} leftIcon={<DeleteIcon />}></Button>
                        </HStack>
                    </CardFooter>
                </Card>
            ))
            }
        </SimpleGrid >
    )
    else {
        return (
            <SimpleGrid spacing={10} minChildWidth="300px">



                {tasks && tasks.map(task => (
                    <Card key={task.id} borderTop="8px" borderColor="purple.400" bg="white" >
                        <CardHeader>
                            <Flex gap={5}>
                                <Avatar src={task.img} />
                                <Box>
                                    <Heading as="h3" size="sm">{task.title}</Heading>

                                </Box>
                            </Flex>
                        </CardHeader>
                        <CardBody color="gray.500">
                            <Text>{task.description}</Text>
                        </CardBody>

                        <Divider borderColor="gray.200" />

                        <CardFooter>
                            <HStack>
                                <NavLink to={`tasks/${task._id}`}>
                                    <Button variant="ghost" leftIcon={<EditIcon />}></Button>
                                </NavLink>
                                <NavLink to={`tasks/${task._id}`}>
                                    <Button variant="ghost" leftIcon={<ViewIcon />}></Button>
                                </NavLink>
                                <Button variant="ghost" onClick={() => deletetask(task._id)} leftIcon={<DeleteIcon />}></Button>
                            </HStack>
                        </CardFooter>
                    </Card>
                ))
                }
            </SimpleGrid >
        )
    }
}
