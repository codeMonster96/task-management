import { DeleteIcon } from '@chakra-ui/icons'
import React from 'react'

export default function Detail() {

    const { id } = useParams("")
    console.log(id);

    const [gettaskdata, settaskdata] = useState([]);
    console.log(gettaskdata);

    // const nav = useNavigation();

    const getdata = async () => {


        const res = await fetch(`/tasks/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }

        });
        const data = await res.json();
        console.log(data);

        if (res.status === 404 || !data) {
            console.log("error");
        }
        else {
            settaskdata(data);
            console.log("get data");
        }
    }
    useEffect(() => {
        getdata();
    }, [])

    const daletetask = async (id) => {
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
            alert("User deleted!!!");
            // let path = "/";
            // nav(path);
            window.location = "/"
        }

    }

    return (
        <Card key={gettaskdata.id} borderTop="8px" borderColor="purple.400" bg="white" >
            <CardHeader>
                <Flex gap={5}>
                    <Avatar src={gettaskdata.img} />
                    <Box>
                        <Heading as="h3" size="sm">{gettaskdata.title}</Heading>
                        <Text> by {gettaskdata.author}</Text>
                    </Box>
                </Flex>
            </CardHeader>
            <CardBody color="gray.500">
                <Text>{gettaskdata.description}</Text>
            </CardBody>

            <Divider borderColor="gray.200" />

            <CardFooter>
                <HStack>
                    <NavLink to={`tasks/${gettaskdata._id}`}>
                        <Button variant="ghost" leftIcon={<EditIcon />}></Button>
                    </NavLink>
                    <Button variant="ghost" onClick={() => deletetask(gettaskdata._id)} leftIcon={<DeleteIcon />}></Button>
                </HStack>
            </CardFooter>
        </Card>
    )
}
