import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import CheckBox from './CheckBox';
import { getTasks } from '../db/firestore';
import TaskItem from './TaskItem';
import { TaskType } from '../types';

const Tasks = () => {

    const [tasks, setTasks ] = useState()



    useEffect(() => {
        getTasks().then(tasks => setTasks(tasks))
    }, [])

    return (
        <View>
            {
                tasks?.map(task => <TaskItem key={task.id} item={task} />)
            }
        </View>
    );
};

const styles =StyleSheet.create({
    taskItem: {
        flexDirection: 'row',
    }
})

export default Tasks;
