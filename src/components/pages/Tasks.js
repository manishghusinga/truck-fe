import React, { useState, useContext, useEffect } from 'react';
import { Store } from "../../store/store";
import { apis } from "../../service/api";
import { toast } from 'react-toastify';
import moment from "moment";
import {
    Row,
    Col,
    Button,
    Modal,
    ModalBody,
    FormGroup,
    FormFeedback,
    Input,
    Label,
    Card,
    CardBody
} from 'reactstrap';

export default function Tasks(props) {
    const {
        data = [],
        type,
        onDragStart,
        onDragOver,
        onDrop
    } = props
    const [storeState, dispatch] = useContext(Store);
    const [message, addMessage] = useState("");
    const [assignTo, updateAssignTo] = useState(1);
    const [priority, addPriority] = useState(1);
    const [dueDate, addDueDate] = useState(moment(new Date()).format("YYYY-MM-DDThh:mm"));
    const [openModal, toggel] = useState(false)
    const [items, setItem] = useState({});

    const deleteTask = () => {
        console.log(items, "tasks")
        apis.deleteTask({ taskid: items.id })
            .then(resp => {
                closeModal()
                if (resp.status == "success") {
                    getTaskList()
                    return toast.success("task has been deleted")
                }
                return toast.error("something went wrong, task not deleted")
            })
    }

    const editTask = (tasks) => {
        addMessage(tasks.message)
        updateAssignTo(tasks.assigned_to)
        addPriority(tasks.priority)
        addDueDate(moment(new Date(tasks.due_date)).format("YYYY-MM-DDThh:mm"))
        setItem(tasks)
        toggel(true)
    }

    useEffect(() => {
        console.log(openModal, dueDate, priority, assignTo, message)
    });


    const closeModal = () => toggel(false)

    function getTaskList() {
        apis.getTaskList()
            .then(response => {
                if (response.status == "success") {
                    let init = { 1: [], 2: [], 3: [] }
                    response.tasks.forEach(item => {
                        init[item.priority].push(item)

                    })
                    dispatch({ type: 'storeList', reducer: 'taskList', payload: { storeList: init } });
                }
            })
    }

    const submitEditCart = () => {
        toggel(!openModal)

        let payload = {
            taskid: items.id,
            'message': message,
            'due_date': moment(new Date(dueDate)).format("YYYY-MM-DD hh:mm:ss"),
            'priority': priority,
            'assigned_to': assignTo
        }

        apis.updateTask(payload)
            .then(resp => {
                if (resp.status == "success") {
                    getTaskList()
                    return toast.success("task has been edited")
                }
                return toast.error("something went wrong, task not edited")
            });
    }

    const priorityMapping = {
        " High": 3,
        "Medium": 2,
        "Low": 1
    }

    return (
        <div id={type}>
            <h4 className="text-center">
                {/* // onDragOver={(e) => onDragOver(e)}
                // onDrop={(e) =>{
                //     console.log(priorityMapping[type], type, "==asdas")
                //      return onDrop(e, priorityMapping[type])
                //      } }> */}
                  {type}
            </h4>
            {data.map(item => (

                            <Card
                                // id={item.id}
                                key={item.id}
                                className="border-bottom mb-2"
                                onDragOver={(e) => onDragOver(e)}
                                onDragStart={(e) => onDragStart(e, JSON.stringify(item))}
                                onDrop={(e) => onDrop(e, priorityMapping[type]) }
                                draggable={true}>
                                <CardBody>
                                    {item.message}
                                    <span className="text-right">
                                        <button type="button" class="btn btn-default" aria-label="Left Align" onClick={() => editTask(item)}>
                                            Edit
                                        </button>
                                    </span>
                                    &nbsp;
                                    &nbsp;
                                    <div className="text-right pt-0 mt-0">
                                        {item.assigned_name}
                                        <img src={""} width={20} className="rounded-circle" />
                                    </div>
                                </CardBody>
                            </Card>

            ))}

            <Modal isOpen={openModal} toggle={closeModal} className="p-2">
                <ModalBody className="pt-2">
                    <FormGroup className="font-14-20 pl-4">
                        <Label check>
                            Message
                                <Input type="text" name="checkDisclaimer"
                                value={message}
                                onChange={(e) => addMessage(e.target.value)} />
                        </Label>
                    </FormGroup>

                    <FormGroup className="font-14-20 pl-4">
                        <Label check>
                            AssignTo
                                <select
                                onChange={(e) => updateAssignTo(e.target.value)}
                                value={assignTo}
                            >
                                {
                                    storeState.userList.map(item => (
                                        <option
                                            value={item.id}
                                            key={item.id}>
                                            {/* //<img src= {item.picture} key={item.id} alt=""/> */}
                                            {item.name} &nbsp;
                                        </option>
                                    ))
                                }

                            </select>
                        </Label>
                    </FormGroup>

                    <FormGroup className="font-14-20 pl-4">
                        <Label check>
                            Priority
                                <select
                                onChange={(e) => addPriority(e.target.value)}
                                value={priority}
                            >
                                {
                                    storeState.priority.map(item => (
                                        <option
                                            value={Object.keys(item)[0]}
                                            key={JSON.stringify(item)}>

                                            {Object.values(item)[0]} &nbsp;
                                        </option>
                                    ))
                                }

                            </select>
                        </Label>
                    </FormGroup>

                    <FormGroup className="font-14-20 pl-4">
                        <Label check>
                            Due Date
                               <Input type="datetime-local" value={dueDate} onChange={(e) => addDueDate(e.target.value)} />
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <Row>
                            <Col>
                                <Button className="btn btn-primary" onClick={() => submitEditCart()}>
                                    Submit
                                </Button>
                            </Col>

                            <Col>
                                <Button className="btn btn-primary" onClick={() => deleteTask()}>
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </ModalBody>
            </Modal>
        </div>
    )
}
