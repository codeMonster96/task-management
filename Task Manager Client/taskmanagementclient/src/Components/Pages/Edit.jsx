import { CardHeader } from '@chakra-ui/react';
import React from 'react'

export default function Edit() {



    const [inpval, setinpval] = useState({
        title: "",
        description: "",

    })

    const setdata = (event) => {
        console.log(event.target.value);
        const { title, value } = event.target;
        setinpval((preval) => {
            return {
                ...preval,
                [title]: value
            }
        })
    };

    const { id } = useParams("")
    console.log(id);



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
            setinpval(data);
            console.log("get data");
        }
    }
    useEffect(() => {
        getdata();
    }, [])

    const updatetask = async (event) => {
        event.preventDefault();
        const { title, description } = inpval;
        const res2 = await fetch(`/updatedata/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, description
            })
        });
        const data2 = await res2.json();
        console.log(data2);
        if (res2.status === 404 || !data2) {
            alert("please enter the data");
        }
        else {
            alert("Data updated successfully");
            window.location = "/";

        }


    }


    return (
        <SimpleGrid spacing={10} minChildWidth="300px">



            <Box maxW="480px">
                <Form
                //method="post" action="/create"
                >
                    <FormControl isRequired mb="40px">
                        <FormLabel>Taskname :</FormLabel>
                        <Input type="text" name="title"
                            onChange={setdata}
                            value={inpval.title}
                        />
                        <FormHelperText>Enter a descriptive task name</FormHelperText>
                    </FormControl>
                    <FormControl mb="40px">
                        <FormLabel>Task Description : </FormLabel>
                        <Textarea
                            placeholder="Enter a detailed description for the task"
                            name="description"
                            onChange={setdata}
                            value={inpval.description}
                        />
                    </FormControl>

                    <Button type="submit"
                        onClick={updatetask}
                    >Submit</Button>
                </Form>
            </Box>
            ))

        </SimpleGrid >
    )
}
export const tasksLoader = async () => {
    const res = await fetch('http://localhost:3000/tasks')
    return res.json()
}