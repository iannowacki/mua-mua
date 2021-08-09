import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import CheckBox from './CheckBox';
import db, { streamTasks } from '../db/firestore';
import TaskItem from './TaskItem';
import { TaskType } from '../types';

const Tasks = () => {

    const [tasks, setTasks ] = useState()

    const mapDocToTask = (document) => {
        return {
            id: document.id,
            name: document.data().name,
            createdAt: document.data().createdAt,
            completedAt: document.data().completedAt,
        };
    };

    useEffect(() => {
        streamTasks({
            next: querySnapshot => {
                const tasks = querySnapshot
                .docs.map(docSnapshot => mapDocToTask(docSnapshot));
                setTasks(tasks);
            },
            error: (error) => console.log(error),
        });
    }, [setTasks]);

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
