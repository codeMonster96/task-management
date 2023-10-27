import { Box, Button, Checkbox, FormControl, FormHelperText, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { Form, redirect } from "react-router-dom";

export default function Create() {

    const [inpval, setinpval] = useState({
        title: "",
        description: "",
    });
    const setdata = (event) => {
        console.log(event.target.value);
        const { title, value } = event.target;
        setinpval((preval) => {
            return {
                ...preval,
                [title]: value,
            };
        });
    };
    const addinpdata = async (event) => {
        event.preventDefault();
        const { title, description } = inpval
        const res = await fetch("/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, description
            })
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 404 || !data) {
            alert("error");
            console.log("error");
        }
        else {
            alert("data added");
            console.log(data);
            return redirect('/')
        }
    }


    return (
        <Box maxW="480px">
            <Form
                method="post" action="/tasks"
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
                    onClick={addinpdata}
                >Submit</Button>
            </Form>
        </Box>
    )
}

export const createAction = async ({ request }) => {
    const data = await request.formData()

    const task = {
        title: data.get('title'),
        description: data.get('description'),

    }

    console.log(task)

    return redirect('/')
}